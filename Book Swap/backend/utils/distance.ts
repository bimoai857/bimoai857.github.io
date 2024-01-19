// utils.ts

import { ICoordinates } from "../src/interface/search";

export function haversineDistance(coord1: ICoordinates, coord2: ICoordinates): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(coord2.latitude - coord1.latitude);
    const dLon = toRadians(coord2.longitude - coord1.longitude);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(coord1.latitude)) * Math.cos(toRadians(coord2.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
  
    return distance;
  }
  
  function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  