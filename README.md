# mars-weather-app

This application is used to fetch data from the NASA mars weather API and returning the data using GraphQL. Data that is not available in the API is saved in the Database.

#### To start the application:
<pre>
git clone https://github.com/dejsenlitro/mars-weather-app.git
cd mars-weather-app
npm i
npm start
open the url http://localhost:4000 in you browser
</pre>


### Examples
##### There are 2 queries exposed:

- getSols(limit: number, page: number)
<pre>
query {
  getSols(limit:3, page: 2) {
    sols {
      sol
      horizontalWindSpeed {
        average
        minimum
        maximum
        measurementsCount
      }
      atmosphericTemperate {
        average
        minimum
        maximum
        measurementsCount
      }
      pressure {
        average
        minimum
        maximum
        measurementsCount
      }
    }
    totalItems
    limit
    page
  }
}
</pre>

- getSol(sol: string)
<pre>
query {
  getSol(sol: "311") {
    sol
    horizontalWindSpeed {
      average
      minimum
      maximum
      measurementsCount
    }
    atmosphericTemperate {
      average
      minimum
      maximum
      measurementsCount
    }
    pressure {
      average
      minimum
      maximum
      measurementsCount
    }
  }
}
</pre>

##### And one subscription:

- changedSols()
<pre>
subscription {
  changedSols {
    sol
    horizontalWindSpeed {
      average
      maximum
      minimum
      measurementsCount
    }
    atmosphericTemperate {
      average
      maximum
      minimum
      measurementsCount
    }
    pressure {
      average
      maximum
      minimum
      measurementsCount
    }
  }
}
</pre>
