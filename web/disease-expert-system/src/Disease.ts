class Disease {
  name: string;
  description: string;
  precautions: string[];

  constructor(name: string, description: string, precautions: string[]) {
    this.name = name;
    this.description = description;
    this.precautions = precautions;
  }
}

export default Disease;
