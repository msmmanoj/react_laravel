## Incident Management

Steps to run the Project

1) Create new .env file with same content as .env.example
2) update DB details in .env with your creds
3) composer install
4) npm install
5) php artisan migrate
6) php artisan db:seed --class=ProductsTableSeeder
7) php artisan cache:clear
8) php artisan serve
9) npm run dev

### API Details

GET API
http://127.0.0.1:8000/api/products

Response

[{"id":1,"name":"Oneplus nord","cat_id":1,"price":25000,"created_at":"2021-08-24 04:56:53","updated_at":"2021-08-24 04:
56:53","category":[{"id":1,"name":"Electronics","created_at":"2021-08-24 09:36:30"}]},{"id":2,"name":"Revlon Lipstick","
cat_id":2,"price":2100,"created_at":"2021-08-24 04:56:53","updated_at":"2021-08-24 04:56:53","
category":[{"id":2,"name":"Cosmetics","created_at":"2021-08-24 09:36:30"}]},{"id":3,"name":"BlackBerry priv","cat_id":
1,"price":39000,"created_at":"2021-08-24 04:56:53","updated_at":"2021-08-24 04:56:53","
category":[{"id":1,"name":"Electronics","created_at":"2021-08-24 09:36:30"}]},{"id":4,"name":"Lakme Lotion","cat_id":2,"
price":3000,"created_at":"2021-08-24 04:56:53","updated_at":"2021-08-24 04:56:53","
category":[{"id":2,"name":"Cosmetics","created_at":"2021-08-24 09:36:30"}]},{"id":5,"name":"Samsung S21","cat_id":3,"
price":69000,"created_at":"2021-08-24 04:56:53","updated_at":"2021-08-24 04:56:53","
category":[{"id":3,"name":"Premium","created_at":"2021-08-24 09:36:30"}]}]


Open
http://127.0.0.1:8000/



