export const ProjectDesc = ({ list, selectedProject }) => {
  const crop = (string, maxLength) => {
    return string.substring(0, maxLength);
  };
  return (
    <div className="descriptions">
      {list.map((project, index) => {
        const { title, description } = project;
        return (
          <div
            key={index}
            className="description"
            style={{
              clipPath:
                selectedProject === index ? "inset(0 0 0)" : "inset(50% 0 50%)",
            }}
          >
            <p>{crop(title, 9)}</p>
            <p>{description}</p>
          </div>
        );
      })}
    </div>
  );
};
