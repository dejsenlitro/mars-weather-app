import {expect} from 'chai'
import WeatherApi from '../src/weatherAPI/weatherApi';
import MockWeatherAPIService from '../src/weatherAPI/mockWeatherAPIService';
import {IGetSolsReponse} from "../src/weatherAPI/models";
import Cache from "../src/cache/cache";

const api = new WeatherApi(new MockWeatherAPIService(), new Cache())

// TODO: Is this really needed?
describe('Available Sols', () => {
  it('limit 3, page 1, total 7', async () => {
    const expectedData: IGetSolsReponse = {
      "sols": [
        {
          "sol": "310",
          "atmosphericTemperate": {
            "average": -69.642,
            "minimum": -102.223,
            "maximum": -26.562,
            "measurementsCount": 282273
          },
          "horiszontalWindSpeed": {
            "average": 719.291,
            "minimum": 700.6195,
            "maximum": 735.2579,
            "measurementsCount": 139131
          },
          "pressure": {
            "average": 5.021,
            "minimum": 0.132,
            "maximum": 19.146,
            "measurementsCount": 130618
          }
        },
        {
          "sol": "309",
          "atmosphericTemperate": {
            "average": -65.937,
            "minimum": -102.283,
            "maximum": -26.188,
            "measurementsCount": 313916
          },
          "horiszontalWindSpeed": {
            "average": 718.042,
            "minimum": 702.5384,
            "maximum": 735.4382,
            "measurementsCount": 156366
          },
          "pressure": {
            "average": 5.019,
            "minimum": 0.214,
            "maximum": 18.942999999999998,
            "measurementsCount": 143831
          }
        },
        {
          "sol": "308",
          "atmosphericTemperate": {
            "average": -70.689,
            "minimum": -102.053,
            "maximum": -25.638,
            "measurementsCount": 199938
          },
          "horiszontalWindSpeed": {
            "average": 721.211,
            "minimum": 703.3229,
            "maximum": 737.0691,
            "measurementsCount": 99938
          },
          "pressure": {
            "average": 4.745,
            "minimum": 0.183,
            "maximum": 18.149,
            "measurementsCount": 91057
          }
        }
      ],
      "totalItems": 7
    }

    const limit: number = 3
    const page: number = 1

    const receivedData = await api.getAvailableSolsMeasurements(limit, page)
    expect(expectedData).deep.equal(receivedData);
  });

  it('limit 3, page 2, total 7', async () => {
    const expectedData: any = {
      "sols": [
        {
          "sol": "307",
          "atmosphericTemperate": {
            "average": -75.405,
            "minimum": -102.027,
            "maximum": -26.828,
            "measurementsCount": 244869
          },
          "horiszontalWindSpeed": {
            "average": 724.205,
            "minimum": 704.6372,
            "maximum": 739.6598,
            "measurementsCount": 123721
          },
          "pressure": {
            "average": 4.203,
            "minimum": 0.20600000000000002,
            "maximum": 18.374000000000002,
            "measurementsCount": 114762
          }
        },
        {
          "sol": "306",
          "atmosphericTemperate": {
            "average": -72.664,
            "minimum": -102.655,
            "maximum": -25.681,
            "measurementsCount": 215500
          },
          "horiszontalWindSpeed": {
            "average": 721.524,
            "minimum": 706.1014,
            "maximum": 740.7565,
            "measurementsCount": 142739
          },
          "pressure": {
            "average": 4.437,
            "minimum": 0.131,
            "maximum": 17.113,
            "measurementsCount": 101771
          }
        },
        {
          "sol": "305",
          "atmosphericTemperate": {
            "average": -71.172,
            "minimum": -104.059,
            "maximum": -27.287,
            "measurementsCount": 240635
          },
          "horiszontalWindSpeed": {
            "average": 722.509,
            "minimum": 708.6817,
            "maximum": 738.4189,
            "measurementsCount": 163933
          },
          "pressure": {
            "average": 4.955,
            "minimum": 0.128,
            "maximum": 22.241,
            "measurementsCount": 110199
          }
        }
      ],
      "totalItems": 7
    }

    const limit: number = 3
    const page: number = 2

    const receivedData = await api.getAvailableSolsMeasurements(limit, page)
    expect(expectedData).deep.equal(receivedData);
  });

  it('limit 3, page 3, total 7', async () => {
    const expectedData: any = {
      "sols": [
        {
          "sol": "304",
          "atmosphericTemperate": {
            "average": -69.046,
            "minimum": -104.325,
            "maximum": -25.869,
            "measurementsCount": 331548
          },
          "horiszontalWindSpeed": {
            "average": 724.646,
            "minimum": 707.9475,
            "maximum": 741.3935,
            "measurementsCount": 164364
          },
          "pressure": {
            "average": 4.758,
            "minimum": 0.132,
            "maximum": 18.224,
            "measurementsCount": 151224
          }
        }
      ],
      "totalItems": 7
    }

    const limit: number = 3
    const page: number = 3

    const receivedData = await api.getAvailableSolsMeasurements(limit, page)
    expect(expectedData).deep.equal(receivedData);
  });
});
