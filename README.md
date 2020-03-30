How to install and play Yannie & Brannie
------------
1. Install node dependencies:
    ```bash
    npm install
    ```

2. Run `phaser_game.sql` SQL script into your MySQL database. This will create the needed database and the table for storing the high scores for the leader board.

3. Configure database connection in `server.js`. Set up your mysql host, user and password.
    ```js
    var connection = mysql.createConnection({
        host     : 'example.com',
        user     : 'user',
        password : 'password',
        database : 'phaser_game'
    });
    ```
    
4. To run the game server use:
    ```bash
    node server.js
    ```