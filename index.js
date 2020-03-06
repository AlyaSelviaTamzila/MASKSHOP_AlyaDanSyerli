const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const session = require('express-session')
const jwt = require('jsonwebtoken')

const app = express()

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const port = 5000;

const secretKey = 'thisisverysecretkey'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: "masker"
})

const isAuthorized = (request, result, next) => {
    // cek apakah user sudah mengirim header 'x-api-key'
    if (typeof(request.headers['x-api-key']) == 'undefined') {
        return result.status(403).json({
            success: false,
            message: 'Unauthorized. Token is not provided'
        })
    }

    // get token dari header
    let token = request.headers['x-api-key']

    // melakukan verifikasi token yang dikirim user
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return result.status(401).json({
                success: false,
                message: 'Unauthorized. Token is invalid'
            })
        }
    })

    // lanjut ke next request
    next()
}

//mencocokkan username dan password yang ada di database
app.post('/login/admin', function(request, response) {
    let data = request.body
	var username = data.username;
	var password = data.password;
	if (username && password) {
		db.query('SELECT * FROM accounts WHERE username= ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = data.username;
				response.redirect('/login/admin');
			} else {
				response.send('Username dan/atau Password salah!');
			}			
			response.end();
		});
	} else {
		response.send('Masukkan Username and Password!');
		response.end();
	}
});


app.get('/login/admin', function(request, results) {
	if (request.session.loggedin) {
        let data = request.body
        let token = jwt.sign(data.username + '|' + data.password, secretKey)

        results.json({
            success: true,
            message: 'Login success, welcome back Admin!',
            token: token
        })
	} else {
        results.json({
            success: false,
            message:'Mohon login terlebih dahulu!'
        })
        }
	
	results.end();
});

//mencocokkan username dan password yang ada di database
app.post('/login/user', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Username dan/atau Password salah!');
			}			
			response.end();
		});
	} else {
		response.send('Masukkan Username and Password!');
		response.end();
	}
});


app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Selamat Datang, ' + request.session.username + '!');
	} else {
		response.send('Mohon login terlebih dahulu!');
	}
	response.end();
});

/********************** CRUD MASKSHOP ***************/
// endpoint get data masker yang ada di database
app.get('/mask', isAuthorized, (req, res) => {
    let sql = `
        select nama_masker, jenis_masker, harga, stock, created_at from maskshop
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            success: true,
            message: 'Success get all mask',
            data: result
        })
    })
})

// endpoint add data masker ke dataase
app.post('/mask', isAuthorized, (request, result) => {
    let data = request.body

    let sql = `
        insert into maskshop (nama_masker, jenis_masker, harga, stock)
        values ('`+data.nama_masker+`', '`+data.jenis_masker+`', '`+data.harga+`', '`+data.stock+`');
    `

    db.query(sql, (err, result) => {
        if (err) throw err
    })

    result.json({
        success: true,
        message: 'New mask available!'
    })
})

// endpoint menampilkan data books dengan id menggunakan token
app.get('/mask/:id', isAuthorized, (req, res)=>{
    let sql = `
        select * from maskshop
        where id = `+req.params.id+`
        limit 1
    `
    db.query(sql, (err, result)=>{
        if (err) throw err
        res.json({
            message: 'Success get mask detail',
            data: result[0]
        })
    })
})

// endpoint edit data masker ke database
app.put('/mask/:id', isAuthorized, (request, result) => {
    let data = request.body

    let sql = `
        update maskshop
        set nama_masker = '`+data.nama_masker+`', jenis_masker = '`+data.jenis_masker+`', harga = '`+data.harga+`', stock = '`+data.stock+`'
        where id = `+request.params.id+`
        `

    db.query(sql, (err, result) => {
        if (err) throw err

        result.json({
            success: true,
            message: 'Data masker berhasil diubah!',
            data: result
        })
    })
})

// endpoint hapus data masker dari database
app.delete('/mask/:id', isAuthorized, (request, result) => {
    let sql = `
        delete from maskshop 
        where id = `+request.params.id+`
    `

    db.query(sql, (err, res) => {
        if (err) throw err
        result.json({
            success: true,
            message: 'Data masker berhasil dihapus',
            data: result
        })
    })
})


/************* CRUD USERS ****************/
// endpoint menampilkan data users dengan menggunakan token
app.get('/user', isAuthorized, (req, res)=>{
    let sql = `
        select username, created_at from user
    `

    db.query(sql, (err, result)=>{
        if (err) throw err
        res.json({
            message: "success get all user",
            data: result
        })
    })
})

// endpoint menambahkan data users dengan menggunakan token
app.post('/user',isAuthorized, (req, res) => {
    let data = req.body
    let sql = `
        insert into user (username, password)
        values ('`+data.username+`', '`+data.password+`')`

    db.query(sql, (err, result)=>{
        if (err) throw err
        res.json({
            message: 'user created',
            data: result
        })
    })
})

// endpoint menampilkan data users dengan id menggunakan token
app.get('/user/:id', isAuthorized, (req, res)=>{
    let sql = `
        select * from user
        where id = `+req.params.id+`
        limit 1`

    db.query(sql, (err, result)=>{
        if (err) throw err
        res.json({
            message: 'Success get user detail',
            data: result[0]
        })
    })
})

// endpoint mengubah data users dengan id menggunakan token
app.put('/user/:id', isAuthorized, (req, res)=>{
    let data = req.body

    let sql = `
        update user
        set username = '`+data.username+`',password = '`+data.password+`'
        where id = '`+req.params.id+`'
        `
    db.query(sql, (err, result)=>{
        if (err) throw err
        res.json({
            message: 'Data has been update',
            data: result
        })
    })
})

// endpoint menghapus data users dengan id menggunakan token
app.delete('/user/:id', isAuthorized, (req, res)=>{
    let sql = `
        delete from user
        where id ='`+req.params.id+`'
    `
    db.query(sql, (err, result)=>{
        if  (err) throw err
        res.json({
            message: ' Data has been deleted',
            data: result
        })
    })
})

/********* TRANSAKSI PEMBELIAN MASKER **************/
// endpoint post data maskshop dengan id bisa menambahkan dan 
// mengubah data maskshop menggunakan token
app.post('/mask/:id/buy', (req, res) => {
    let data = req.body

    db.query(`
        insert into user_mask (user_id, mask_id)
        values ('`+data.user_id+`', '`+req.params.id+`')
    `, (err, result) => {
        if (err) throw err
    })

    db.query(`
        update maskshop
        set stock = stock - 1
        where id = '`+req.params.id+`'
    `, (err, result) => {
        if (err) throw err
    })

    res.json({
        message: "Maks has been purchased by user"
    })
})

// endpoint menampilkan(get) data users right join data maskshop
// dengan id menggunakan token
app.get('/user/:id/mask', (req, res) => {
    db.query(`
        select maskshop.nama_masker, maskshop.jenis_masker, maskshop.harga, maskshop.stock
        from user
        right join user_mask on user.id = user_mask.user_id
        right join maskshop on user_mask.mask_id = maskshop.id
        where user.id = '`+req.params.id+`'
    `, (err, result) => {
        if (err) throw err

        res.json({
            message: "success get user's maskshop",
            data: result
        })
    })
})




/********** Run Application **********/
app.listen(port, () => {
    console.log('App running on port ' + port)
})

