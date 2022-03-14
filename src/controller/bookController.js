const { Router } = require("express");
const express = require("express");
const router = express.Router();
const Book = require('../models/book');
const borrowBook = require("../models/borrowBook");

let listBook = [];

exports.getBook = router.get('/book', async (req, res) => {
    if (listBook.length == 0) {
        const listDataBook = await Book.find();
        listDataBook.forEach(book => {
            listBook[book.Id] = {
                Name: book.Name,
                RatingDist1: book.RatingDist1,
                pagesNumber: book.pagesNumber,
                RatingDist4: book.RatingDist4,
                RatingDistTotal: book.RatingDistTotal,
                PublishMonth: book.PublishMonth,
                PublishDay: book.PublishDay,
                Publisher: book.Publisher,
                CountsOfReview: book.CountsOfReview,
                PublishYear: book.PublishYear,
                Language: book.Language,
                Authors: book.Authors,
                Rating: book.Rating,
                RatingDist2: book.RatingDist2,
                RatingDist5: book.RatingDist5,
                ISBN: book.ISBN,
                RatingDist3: book.RatingDist3
            };
        });
        console.log("get data DB");
    }
    console.log(listBook.length);
    res.send(listBook);
})

exports.getBookFromId = router.get('/book/:id', (req, res) => {
    res.send(listBook[req.params.id]);
})

exports.postBook = router.post('/book', (req, res) => {
    let newBook = req.body
    listBook.push(newBook);
    let lastId = listBook.length;
    newBook.Id = lastId;
    Book.create(newBook);
    res.send('create Data!');
})

exports.putBook = router.put('/book/:id', async (req, res) => {
    let updateBook = req.body;
    await Book.findOneAndUpdate({ Id: req.params.id }, updateBook);
    delete updateBook.Id;
    listBook[req.params.id] = updateBook;
    res.send('update');
})

exports.deleteBook = router.delete('/book/:id', async (req, res) => {
    await Book.deleteOne({ Id: req.params.id });
    if (Number(req.params.id) != listBook.length - 1) {
        listBook[req.params.id] = null;
    } else {
        listBook.pop();
    }
    res.send('delete');
})

exports.borrowBook = router.get('/book/borrow/:id', async (req, res) => {
    const name = req.body.name;
    const today = new Date();
    const checkBorrowBook = await borrowBook.findOne({ Id: req.params.id, status: "đang mượn" });
    if (!checkBorrowBook) {
        await borrowBook.create({
            borrrowedDate: `${today.getMinutes()}:${today.getHours()} ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
            Id: req.params.id,
            name: name,
            status: "đang mượn"
        });
        res.send("borrow success!");
    } else {
        res.send("already borrowed!");
    }
})

exports.returnBook = router.get('/book/return/:id', async (req, res) => {
    const name = req.body.name;
    const today = new Date();
    const checkBorrowBook = await borrowBook.findOneAndUpdate({ Id: req.params.id, name: name, status: "đang mượn" }, {
        returnDate: `${today.getMinutes()}:${today.getHours()} ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
        status: "đã trả"
    });
    if (checkBorrowBook) {
        res.send("return success!");
    } else {
        res.send("does not exist");
    }
})
