# MongoDB usage instructions

These are just some notes, as a wiki, about using Mongo

## Using Mongo Shell

1. SSH into the virtual machine:

    ```
    cd vagrant/local
    vagrant ssh
    ```

2. Start Mongo Shell

    ```
    mongo
    ```

3. Show databases

    ```
    show dbs
    ```

4. Connect to a database

    ```
    use example_db
    ```

5. Show collections (equivalent of RDBMS table)

    ```
    show collections
    ```

6. Show all documents (equivalent of RDBMS row) or a table

    ```
    coll = db.example_table
    coll.find()
    ```

7. Find documents that match a condition

    ```
    coll.find({conditionKey: conditionValue})
    ```
