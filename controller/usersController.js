require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.MONGO_DB);

module.exports = {
  getAllData: async (req, res) => {
    try {
      await client.connect();
      const collection = client.db('ultima_store').collection('test');

      const cursor = collection.find({});
      const result = await cursor.toArray();

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      client.close();
    }
  },
  getDataMatch: async (req, res) => {
    try {
      await client.connect();
      const collection = client.db('ultima_store').collection('test');

      const cursor = collection.aggregate([{ $match: req.query }]);
      const result = await cursor.toArray();

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      client.close();
    }
  },
  getDataWithBody: async (req, res) => {
    try {
      await client.connect();
      const collection = client.db('ultima_store').collection('test');

      const cursor = collection.find(req.body);
      const result = await cursor.toArray();

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      client.close();
    }
  },
  getDataFilter: async (req, res) => {
    try {
      await client.connect();
      const collection = client.db('ultima_store').collection('test');

      console.log(req.body);

      let cursor;

      if (req.body.keyword) {
        cursor = collection.aggregate([
          {
            $match: {
              $or: [
                { name: { $regex: req.body.keyword, $options: 'i' } },
                { occupation: { $regex: req.body.keyword, $options: 'i' } },
                { origin: { $regex: req.body.keyword, $options: 'i' } },
                { address: { $regex: req.body.keyword, $options: 'i' } },
                { age: { $regex: req.body.keyword, $options: 'i' } },
              ],
            },
          },
        ]);
      } else {
        cursor = collection.find({});
      }

      // hasil practice jangan di hapus!
      // const cursor = collection.aggregate([
      //   { $match: req.query },
      //   { $group: { _id: `$${req.body.value}`, totalData: { $count: {} } } },
      //   { $sort: { _id: -1 } },
      // ]);
      // const result = await cursor.toArray();

      let cursorFinal;

      if (req.body.sort) {
        const sort_query = req.body.sort.split('-');
        if (sort_query[1] == 'asc') {
          cursorFinal = cursor.sort({ [sort_query[0]]: 1 });
        } else if (sort_query[1] == 'dsc') {
          cursorFinal = cursor.sort({ [sort_query[0]]: -1 });
        }
      } else {
        cursorFinal = cursor;
      }

      const result = await cursorFinal.toArray();

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      client.close();
    }
  },
  addData: async (req, res) => {
    try {
      if (req.user.role !== 'Admin') {
        return res.status(403).send(`You don't have the proper permission to perform this action`);
      }
      await client.connect();
      const collection = client.db('ultima_store').collection('test');

      const result = await collection.insertMany([req.body]);

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      client.close();
    }
  },
  editData: async (req, res) => {
    try {
      if (req.user.role !== 'Admin') {
        return res.status(403).send(`You don't have the proper permission to perform this action`);
      }
      await client.connect();
      const collection = client.db('ultima_store').collection('test');

      const result = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      client.close();
    }
  },
  deleteData: async (req, res) => {
    try {
      if (req.user.role !== 'Admin') {
        return res.status(403).send(`You don't have the proper permission to perform this action`);
      }
      await client.connect();
      const collection = client.db('ultima_store').collection('test');
      console.log(req.query);

      const result = await collection.deleteOne({ _id: ObjectId(req.params.id) });
      if (result.deletedCount === 1) {
        res.status(200).send(result);
      } else {
        res.status(204).send('No document matched the query. Deleted 0 documents');
      }
    } catch (err) {
      res.status(500).send(err);
    } finally {
      client.close();
    }
  },
};
