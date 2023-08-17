export type DistanceSort = 'lunar' | 'kilometers';
type Diameter = {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export type Approach = {
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: number;
    relative_velocity: {
      kilometers_per_second: string;
      kilometers_per_hour: string;
      miles_per_hour: string;
    },
    miss_distance: {
      astronomical: string;
      lunar: string;
      kilometers: string;
      miles: string;
    },
    orbiting_body: string;
  }

export type AsteroidType = {
    links: {
        self: string;
      },
    id:string;
    neo_reference_id: string,
    name: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: {
        kilometers: Diameter;
        meters: Diameter;
        miles: Diameter;
        feet: Diameter;
      },
    close_approach_data: Approach[];
    is_potentially_hazardous_asteroid: boolean;
    is_sentry_object: boolean;
    inCart: boolean;
}