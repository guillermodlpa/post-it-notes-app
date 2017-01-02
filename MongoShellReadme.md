# MongoDB usage instructions

These are just some notes, as a wiki, about using Mongo

## Using Mongo Shell

* Start Mongo Shell

    ```
    mongo
    ```

* Show databases

    ```
    show dbs
    ```

* Connect to a database

    ```
    use example_db
    ```

* Show collections (equivalent of RDBMS table)

    ```
    show collections
    ```

* Show all documents (equivalent of RDBMS row) or a table

    ```
    coll = db.example_table
    coll.find()
    ```

* Find documents that match a condition

    ```
    coll.find({conditionKey: conditionValue})
    ```
