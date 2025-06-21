export interface Pokemon {
    id: string;
    name: string;
    type: string;
    image: string;
    power: number;
    life: number;
  }

export interface PokemonQueryParams {
    type?: string;
    sortBy?: 'name' | 'power';
    order?: 'asc' | 'desc';
    search?: string;
    page?: number;
    limit?: number;
  }
  
export interface PaginatedResult<T> {
    total: number | null;
    page: number;
    pageSize: number;
    results: T[];
  }
export interface PokemonUpdateInput {
    name?: string;
    image?: string;
    type?: string;
    power?: number;
    life?: number;
  }
  