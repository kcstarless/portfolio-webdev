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

// Fragment Shader
export const fragmentShader = `
uniform float u_time;
uniform float u_colorSpeed;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    // Define a palette of colors
    vec3 colors[6];
    colors[0] = vec3(1.0, 0.0, 0.0); // Red
    colors[1] = vec3(0.0, 1.0, 0.0); // Green
    colors[2] = vec3(0.0, 0.0, 1.0); // Blue
    colors[3] = vec3(1.0, 1.0, 0.0); // Yellow
    colors[4] = vec3(1.0, 0.0, 1.0); // Magenta
    colors[5] = vec3(0.0, 1.0, 1.0); // Cyan

    // Calculate the azimuthal angle (phi) based on the x and z coordinates
    float phi = atan(vPosition.z, vPosition.x) + 3.14159265; // Convert -PI to PI → 0 to 2*PI

    // Divide the sphere into 6 regions based on the angle
    float region = floor(phi / (6.2831853 / 6.0)); // 2*PI divided by 6 regions

    // Assign a color based on the region
    vec3 color = colors[int(mod(region, 6.0))];

    gl_FragColor = vec4(color, 1.0);
}
`;
