package router

import (
	"net/http"
	"strconv"

	"github.com/antfor/fond-search/src/model"
	"github.com/gin-gonic/gin"
)

type HttpRouter interface {
	init()
}

type Router struct{}

func start(router *Router) {

}

var trustedProxies = []string{"192.168.1.2"}

func RunRouter(ip string, port int) *gin.Engine {
	router := gin.Default()
	//gin.SetMode(gin.ReleaseMode)
	router.GET("/albums", getAlbums)
	router.GET("/albums/:id", getAlbumByID)
	router.POST("/albums", postAlbums)
	router.Run(ip + ":" + strconv.Itoa(port))
	//router.SetTrustedProxies(trustedProxies)
	return router
}

// getAlbums responds with the list of all albums as JSON.
func getAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, model.Albums)
}

// postAlbums adds an album from JSON received in the request body.
func postAlbums(c *gin.Context) {
	var newAlbum model.Album

	// Call BindJSON to bind the received JSON to
	// newA.
	if err := c.BindJSON(&newAlbum); err != nil {
		return
	}

	// Add the new album to the slice.
	model.AppendAlbum(newAlbum)
	c.IndentedJSON(http.StatusCreated, newAlbum)
}

// getAlbumByID locates the album whose ID value matches the id
// parameter sent by the client, then returns that album as a response.
func getAlbumByID(c *gin.Context) {
	id := c.Param("id")

	// Loop over the list of albums, looking for
	// an album whose ID value matches the parameter.
	for _, a := range model.Albums {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
}

//GET
//PUT
//POST
//DELETE
//PATHC
