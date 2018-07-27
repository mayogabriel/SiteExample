# Laravel 5.1 & Angular - Newsmaker

## Features:
* Independent Laravel, Angular, Beanstalk
* Laravel 5.1 for API
  - Include Json Auth Token
  - Include Data Transformer
  - Include API Data Exception
  - Output JSON or others
  - Include CSRF Protection
  - Timezone
* Angular 1.4 for Backend
  - Include AdminLTE template
  - Include ui-router, Restangular etc ...
  - Timezone
  - Support Multi-Languages interface - Soon
* Backend
	* User & Role management
* Frontend
	* Soon
	
-----
## Install:
* [Step 1: Get the code](#step1)
* [Step 2: Init api](#step2)
* [Step 3: Init Backend](#step3)
* [Step 4: Production](#step4)
* [Step 5: Start](#step5)

-----
<a name="step1"></a>
### Step 1: Get the code

[Download Now] (https://github.com/powersiteGit/Newsmaker-App/archive/master.zip)

-----
<a name="step2"></a>
### Step 2: Init api
 
#### Init Laravel
1. Move to `api` directory
2. Run `composer install`

#### Install Beanstalk and Beanstalk-console
3. Run `sudo -apt-get install beanstalkd`
4. Run `sudo apt-get install -y php5 php5-cli`
5. Install `composer create-project ptrofimov/beanstalk_console` in a folder of your choice

#### Init Database
6. Setup database config in `.env` file (copy from `.env.example`) OR in `config/database.php`
7. Run `php artisan migrate --seed`

#### Generate Key
8. Run `php artisan key:generate`
9. verify that you have changed in file `.env` and `conifg/app.php`


-----
<a name="step3"></a>
### Step 3: Init Backend

This project makes use of Bower. You must first ensure that Node.js (included in homestead) is installed on your machine.

1. Install npm, gulp, bower 
2. Run `sudo apt-get install nodejs` if not installed
3. Run `sudo apt-get install nodejs-legacy`
4. Run `sudo npm install -g npm@latest-2`
5. Run `sudo npm install`
6. Run `sudo npm install gulp`
7. Run `sudo npm install -g bower` (If it does not work, execute "sudo ln -s /usr/bin/nodejs /usr/bin/node")
8. Run `bower install`
9. Edit `backend/src/app/index.js`, replace `localhost:8000` to your api domain
10. Run `gulp serve` for development


-----
<a name="step4"></a>
### Step 4: Production

#### API
1. edit `.env` file set `APP_DEBUG` to `false`

#### Backend
1. run `gulp` in `backend` directory. It will auto copy `backend/dist` all files to `api/public/assets-backend`

#### Frontend
1. Move all frontend files to `api/public`

#### Server
Redirect backend:

##### Apache
```
    RewriteRule ^backend/(.*)\.([^\.]+)$ /assets-backend/$1.$2 [L]
```

----
<a name="step5"></a>
### Step 5: Start 

1. access `http://yourdomain.com/backend`
You can now login to admin:

    username: `admin@newsmaker.com`
    password: `adminmark`

-----
## Demo:

Soon

-----

## API Detail:


### Add Exception
Add Whatever Exception you want in `api/app/Exceptions`

Example:
```php
class EmailOrPasswordIncorrectException extends HttpException
{
    public function __construct($message = null, \Exception $previous = null, $code = 0)
    {
        parent::__construct(401, 'Email/Password is incorrect', $previous, [], 10001);
    }
}
```
Use it:
```php
    throw new EmailOrPasswordIncorrectException;
```

Output:
```json
{
    "result":{
        "status":false,
        "code":10001,
        "message":"Email\/Password is incorrect"
    }
}
```

### Add Transformer
It helps to output good format you need. 
Add new transformer you want in `api/app/Transformers`
More details: see [this](http://fractal.thephpleague.com/transformers/) 

```php
class UserTransformer extends TransformerAbstract
{

   public function transform(User $item)
    {
        return [
            'id'            => (int)$item->id,
            'email'         => $item->email,
            'lastname'      => $item->lastname,
            'firstname'     => $item->firstname,
            'phone'         => $item->phone,
            'active'        => (boolean)$item->active,
            'created_at'    => $item->created_at,
            'updated_at'    => $item->updated_at,
        ];
    }
}
```

### Config JWT
Soon

## Backend Detail:
Soon
## Frontend Detail:
1. You can move all frontend file to `api/public`
