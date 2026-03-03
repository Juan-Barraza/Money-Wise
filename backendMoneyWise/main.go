package main

import (
	"log"
	"moneyWise/router"
	"moneyWise/sql"
	"moneyWise/utils"
)

func main() {

	db, err := sql.SetDB()
	if err != nil {
		log.Fatalf("Error configurating DB: %v ", err)
	}
	sql.SeedCategories(db)

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("Error obteniendo sql.DB: %v", err)
	}
	defer sqlDB.Close()

	app, err := utils.InitFiber()
	if err != nil {
		log.Fatal("error al configurar fiber")
	}

	router.SetUpRouters(db, app)

	if err := app.Listen(":8000"); err != nil {
		log.Fatalf("error to init server", err)
	}

}
