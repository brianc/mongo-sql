var assert  = require('assert');
var builder = require('../');

describe('Built-In Query Types', function(){

  describe('Type: update', function(){

    it('should update', function(){
      var query = builder.sql({
        type: 'update'
      , table: 'users'
      , where: {
          id: 7
        }
      , updates: {
          name: 'Bob'
        , email: 'bob@bob.com'
        }
      });

      assert.equal(
        query.toString()
      , 'update "users" set "name" = $1, "email" = $2 where "users"."id" = $3'
      );

      assert.deepEqual(
        query.values
      , ['Bob', 'bob@bob.com', 7]
      );
    });

    it('should update and return', function(){
      var query = builder.sql({
        type: 'update'
      , table: 'users'
      , where: {
          id: 7
        }
      , updates: {
          name: 'Bob'
        , email: 'bob@bob.com'
        }
      , returning: ['id']
      });

      assert.equal(
        query.toString()
      , 'update "users" set "name" = $1, "email" = $2 where "users"."id" = $3 returning "users"."id"'
      );

      assert.deepEqual(
        query.values
      , ['Bob', 'bob@bob.com', 7]
      );
    });

    it('$inc', function(){
      var query = builder.sql({
        type: 'update'
      , table: 'users'
      , where: {
          id: 7
        }
      , updates: {
          $inc: { count: 5 }
        }
      });

      assert.equal(
        query.toString()
      , 'update "users" set "count" = "users"."count" + $1 where "users"."id" = $2'
      );

      assert.deepEqual(
        query.values
      , [5, 7]
      );
    });

    it('$dec', function(){
      var query = builder.sql({
        type: 'update'
      , table: 'users'
      , where: {
          id: 7
        }
      , updates: {
          $dec: { count: 5 }
        }
      });

      assert.equal(
        query.toString()
      , 'update "users" set "count" = "users"."count" - $1 where "users"."id" = $2'
      );

      assert.deepEqual(
        query.values
      , [5, 7]
      );
    });

  });
});