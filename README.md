## Running the application

1. Install terraform. Make sure that `terraform` command does not return command not found.
2. Edit .env file with your AWS user credentials, bucketname etc.,(I have added my own user credential just for ease, this file will not be checked in).
3. Run `chmod +x deploy.sh`.
2. Deploy app to aws with terraform run `npm run deploy`.
    This will create an Cognito user pool, S3 bucket for serving the app.
    and also `app-config.json` with app configuration.
    After this do the following configuration(This one is the manual step for now)
    1. sign in to aws console.
    2. Navigate to services -> cognito.
    3. Select manage user pools.
    4. You will see a user pool names "pool" is created. click on it.
    5. Navigate to App client setting and check "Select All" checkbox against "Enabled Identity    Providers" at the top.

2. Run `npm install` to setup and install the dependencies.
3. Run `npm start` to start the application locally.
4. A browser session should automatically open, pointing at `http:localhost:8080`.
5. Url to view deployed version will be present in `app-config.json` against key 'website_endpoint'.
   (If this url doesn't work try changing https to http)

## Pending scenarios

1. SSL certificate is not added to S3 bucket.
    Implications: 
      Cognito restricts callback url's to https only except for localhost, so sign in flow does not work on deployed version but works locally.

      App is deployed on [this](http://coderland.taxcalculator.s3-website-us-east-1.amazonaws.com/) url without signin functionality.
    Reason: 1. Free ssl certificate was getting reject for default s3 domain.
            I was planning to generate SSL cert using letsencrypt but it will take some more time for me to figure out how can i run command in s3 bucket. 



