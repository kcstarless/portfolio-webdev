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

void main() {
    // Define five colors for the blob's regions
    vec3 color1 = vec3(1.0, 0.0, 0.0);  // Red
    vec3 color2 = vec3(1.0, 0.647, 0.0);  // Orange
    vec3 color3 = vec3(0.0, 0.0, 0.0);  // Black
    vec3 color4 = vec3(0.0, 0.0, 1.0);  // Blue
    vec3 color5 = vec3(0.0, 0.6, 0.0);  // Green

    // Define the boundaries for the 5 regions by dividing the sphere into different sections
    // Using the x, y, and z positions to decide the color region.
    float x = vPosition.x;
    float y = vPosition.y;
    float z = vPosition.z;
    
    vec3 finalColor;

    // Check the position of each fragment in relation to the defined regions
    if (x > 0.0 && y > 0.0 && z > 0.0) {
        finalColor = color1;  // Top-right-front quadrant (red)
    } else if (x < 0.0 && y > 0.0 && z > 0.0) {
        finalColor = color2;  // Top-left-front quadrant (orange)
    } else if (x < 0.0 && y < 0.0 && z > 0.0) {
        finalColor = color3;  // Bottom-left-front quadrant (black)
    } else if (x > 0.0 && y < 0.0 && z > 0.0) {
        finalColor = color4;  // Bottom-right-front quadrant (blue)
    } else {
        finalColor = color5;  // Remaining region (green)
    }

    // Apply the final color to the fragment
    gl_FragColor = vec4(finalColor, 1.0);
}
`;
