### API DOCUMENTATION

#### requirement

`
BE

-  membuat api untuk user / admin login
-  membuat api untuk user booking travel ke tempat tertentu
-  membuat api untuk menampilkan data tempat travel untuk di booking
-  membuat api untuk menampilkan macam macam service yang tersedia di tribego
-  membuat api untuk menampilkan gambar GALLERY
-  membuat api untuk menampilkan data orang yang sudah mereview, data tersebut sifatnya dynamic
-  membuat api untuk melakukan contact ke admin

BE DETAILS TASK BY USERS :
user :

-  user dapat membuat akun ( CREATE )
-  user dapat login ke aplikasi
-  user dapat melakukan booking ke destinasi tertentu
-  user dapat melakukan review terhadap destinasi yang sudah dia pilih
-  user dapat melihat destinasi yang sudah dia booking

admin :

-  admin dapat login ke aplikasi
-  admin dapat create, update, lihat dan delete image untuk gambar gallery
-  admin dapat create, update, lihat dan delete untuk service yang dia berikan
-  admin dapat create, update, lihat dan delete untuk keluhan user
-  admin dapat melakukan create, update, lihat dan delete untuk user yang melakukan review
-  admin dapat melakukan create, update, lihat dan delete destinasi wisata
-  admin dapat melakukan delete, update, dan lihat daftar wisata yang di booking oleh para users

`

### USER

> POST /api/create/user

```json
    request body:
    {
        name
        email
        password
    }

    response:
    {
        statusCode : 200,
        message : "Successfully created user",
        additionalData : {}
    }
```

> GET /api/users

```json
response:
    {
        statusCode : 200,
        message : "OK",
        additionalData : [
            {
                name,
                email,
            }
        ]
    }
```

> PUT /api/update/user/:id

```json
    response :  {
        statusCode : 200,
        message : "Successfully updated data user",
        additionalData : {}
    }
```

> DELETE /api/user/:id

```json
    response :  {
        statusCode : 200,
        message : "Successfully deleted data user",
        additionalData : {}
    }
```

> POST /api/verify/user ( LOGIN )

```json
    request body : {
        email,
        password
    }
    response :  {
        statusCode : 200,
        message : "OK",
        additionalData : {
            name,
            email
        }
    }
```

> GET /api/users ( GET ALL DATA USERS f/ admin panel)

```json
    response :  {
        statusCode : 200,
        message : "OK",
        additionalData : [
            {
                name,
                email
            }
        ]
    }
```

### GALLERY

> GET /api/galleries

```json

    response :
    {
        statusCode : 200,
        message : "OK",
        additionalData : [
            images,
        ]
    }

```

> DELETE /api/galleries/:id

```json

    response :
    {
        statusCode : 200,
        message : "Successfuly deleted",
        additionalData : {}
    }

```

> PUT /api/update/galleries/:id

```json
    response :
    {
        statusCode : 200,
        message : "Successfully updated data gallery",
        additionalData : {}
    }
```

> POST /api/galleries

```json
    request : {
        images
    }
    response :
    {
        statusCode : 200,
        message : "Successfully created gallery",
        additionalData : {}
    }
```

### SERVICES

> GET /api/services

```json
    response :
    {
        statusCode : 200,
        message : "Successfully created gallery",
        additionalData : [
            {
                images,
                title,
                description
            }
        ]
    }
```

> PUT /api/update/services/:id

```json
    response :
    {
        statusCode : 200,
        message : "Successfully updated services",
        additionalData : {}
    }
```

> DELETE /api/services/:id

```json
    response :
    {
        statusCode : 200,
        message : "Successfully deleted services",
        additionalData : {}
    }
```

> POST /api/create/services

```json
    request :
    {
        images,
        title,
        description
    }
    response :
    {
        statusCode : 200,
        message : "Successfully deleted services",
        additionalData : {}
    }
```

## Destination

> POST /api/create/destinations

```json
    request :
    {
        Title,
        Location,
        Description,
        Price,
        Promo,
    }
    response :
    {
        statusCode : 200,
        message : "Successfully created destination",
        additionalData : {}
    }
```

> GET /api/destinations

```json
 response :
    {
        statusCode : 200,
        message : "OK",
        additionalData : [
            {
                Title,
                Location,
                Description,
                Price,
                Promo,
            }
        ]
    }

```

> DELETE /api/destinations/:id

```json
 response :
    {
        statusCode : 200,
        message : "Sucessfully deleted destination",
        additionalData : {}
    }

```

> PUT /api/update/destionations/:id

```json
 response :
    {
        statusCode : 200,
        message : "Sucessfully updated destination",
        additionalData : {}
    }
```

## BOOK

> GET /api/book

```json
    response :
    {
        statusCode : 200,
        message : "OK",
        additionalData : [
            {
                destination : {
                    Title,
                    Location
                    Price,
                }
                User : {
                    name,
                    email
                }
                guest,
                startBook,
                endBook
            }
        ]
    }


```

> POST /api/create/book

```json
    request :
    {
        destinationId,
        userID,
        guest,
        startBook,
        endBook
    }
    response :
    {
        statusCode : 200,
        message : "Successfully created book",
        additionalData : {}
    }


```

> PUT /api/update/book/:id

```json
 response :
    {
        statusCode : 200,
        message : "Successfully updated book",
        additionalData : {}
    }
```

> DELETE /api/book/:id

```json
 response :
    {
        statusCode : 200,
        message : "Successfully deleted book",
        additionalData : {}
    }
```

## REVIEW

> POST /api/create/review

```json
    request : 
        {
            userId,
            starReview,
            Description
        }
    response :
        {
            statusCode : 200,
            message : "Successfully created review",
            additionalData : {}
        }
```

> DELETE /api/review/:id
```json
      response :
        {
            statusCode : 200,
            message : "Successfully deleted review",
            additionalData : {}
        }
```

> PUT /api/review/:id
```json
      response :
        {
            statusCode : 200,
            message : "Successfully updated review",
            additionalData : {}
        }
```

