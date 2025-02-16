import { IMAGE } from '~/mocks';
import { Route } from './schemas';

export const curatedRoutes: Route[] = [
  {
    id: '1',
    title: 'Historical Kyoto',
    description: "Explore Kyoto's most iconic temples and shrines.",
    duration: 'Full-day',
    image: IMAGE.KYOTO,
    pointsOfInformation: [
      {
        name: 'Kinkaku-ji (Golden Pavilion)',
        description: 'A Zen Buddhist temple covered in gold leaf.',
        coordinates: { latitude: 34.9916, longitude: 135.7481 },
      },
      {
        name: 'Fushimi Inari Shrine',
        description: 'A Shinto shrine known for its thousands of torii gates.',
        coordinates: { latitude: 34.967, longitude: 135.7684 },
      },
      {
        name: 'Kiyomizu-dera Temple',
        description:
          'A historic temple with a wooden stage that offers panoramic views.',
        coordinates: { latitude: 34.9851, longitude: 135.7856 },
      },
    ],
  },
  {
    id: '2',
    title: "Barcelona's Modernist Architecture",
    description: 'Discover the architectural wonders of Antoni Gaudí.',
    duration: 'Full-day',
    image: IMAGE.BARCELONA,
    pointsOfInformation: [
      {
        name: 'Sagrada Familia',
        description: 'A large unfinished Roman Catholic minor basilica.',
        coordinates: { latitude: 41.4036, longitude: 2.1744 },
      },
      {
        name: 'Park Güell',
        description:
          'A public park system composed of gardens and architectural elements.',
        coordinates: { latitude: 41.4145, longitude: 2.1527 },
      },
      {
        name: 'Casa Batlló',
        description: 'A renowned building designed by Antoni Gaudí.',
        coordinates: { latitude: 41.3917, longitude: 2.1649 },
      },
    ],
  },
];
