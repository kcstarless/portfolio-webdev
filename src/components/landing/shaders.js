// Vertex Shader
export const vertexShader = `
uniform float u_time;
uniform float u_speed;
uniform float u_intensity;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normal;
  vPosition = position;

  // Distortion using sine waves based on vertex position
  float distortion = sin(position.x * 5.0 + u_time * u_speed) * u_intensity;
  distortion += cos(position.y * 5.0 + u_time * u_speed) * u_intensity;

  // Apply the distortion
  vec3 newPosition = position + normal * distortion;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

// Fragment Shader (Modified to display 4 colors at once)
export const fragmentShader = `
uniform float u_time;
uniform float u_colorSpeed;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float u_clickCounter;  // Click counter as a float

void main() {
    // Define base colors: Green → Yellow → Orange → Red → Magenta → Blue
    const vec3 colors[6] = vec3[6](
        vec3(0.0, 0.6, 0.0),   // Green
        vec3(0.7, 0.7, 0.0),   // Yellow
        vec3(1.0, 0.647, 0.0), // Orange
        vec3(1.0, 0.0, 0.0),   // Red
        vec3(1.0, 0.0, 1.0),   // Magenta
        vec3(0.0, 0.0, 1.0)    // Blue
    );

    // Define slightly brighter colors for the final click
    const vec3 brightColors[6] = vec3[6](
        vec3(0.2, 0.85, 0.2),   // Slightly brighter Green
        vec3(0.85, 0.85, 0.2),  // Slightly brighter Yellow
        vec3(1.0, 0.75, 0.3),   // Slightly brighter Orange
        vec3(1.0, 0.2, 0.2),    // Slightly brighter Red
        vec3(1.0, 0.2, 1.0),    // Slightly brighter Magenta
        vec3(0.2, 0.2, 1.0)     // Slightly brighter Blue
    );

    // Limit u_clickCounter to max 5
    float maxClicks = 5.0;
    float clickStage = clamp(floor(u_clickCounter), 0.0, maxClicks);

    // If no clicks, entire surface is green
    if (clickStage == 0.0) {
        gl_FragColor = vec4(colors[0], 1.0);
        return;
    }

    // Number of sections based on click count
    float totalRegions = (clickStage < maxClicks) ? clickStage + 1.0 : 24.0;

    // Get azimuth angle (phi) from x and z coordinates
    float phi = atan(vPosition.z, vPosition.x) + 3.14159265; // Convert -PI to PI → 0 to 2*PI

    // Calculate region width
    float regionWidth = 6.2831853 / totalRegions; // 2*PI / totalRegions

    // Determine region index
    int regionIndex = int(floor(phi / regionWidth));
    if (clickStage == maxClicks) {
        regionIndex = regionIndex % 6; // Repeat 6 colors in 24 sections
    }

    // Use slightly brighter colors on final click
    vec3 finalColor = (clickStage == maxClicks) ? brightColors[regionIndex] : colors[regionIndex];

    gl_FragColor = vec4(finalColor, 1.0);
}

`;
