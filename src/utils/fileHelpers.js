// Utility functions for file processing or validation

export const validateFileType = (file) => {
    const validTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
    return validTypes.includes(file.type);
  };
  