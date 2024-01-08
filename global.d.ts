declare global {
    type ItemType = {
      id:string;
      name: string;
      email: string;
      created_by: string;
      created_by_email: string;
      created_at: Date;
    };
  }