class Position {
  private id: string | null;
  private name: string;
  private description: string | null;
  private parentId: string | null;

  constructor(
    name: string,
    description: string | null,
    parentId: string | null
  ) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.parentId = parentId;

    this.validate();
  }

  getId(): string | null {
    return this.id;
  }

  setId(id: string | null): void {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getDescription(): string | null {
    return this.description;
  }

  setDescription(description: string | null): void {
    this.description = description;
  }

  getParentId(): string | null {
    return this.parentId;
  }

  setParentId(parentId: string | null): void {
    this.parentId = parentId;
  }

  validate() {
    if (!this.name) {
      throw new Error("Position name is required");
    }
  }
}
export default Position;
