package handlers

import (
	"moneyWise/dtos"
	"moneyWise/services"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v3"
)

type TransactionHandler struct {
	txService *services.TransactionService
}

func NewTransactionHandler(txService *services.TransactionService) *TransactionHandler {
	return &TransactionHandler{txService: txService}
}

func (h *TransactionHandler) GetAll(c fiber.Ctx) error {
	userID := c.Locals("userID").(uint)

	filters := dtos.TransactionFilters{
		Type:   c.Query("type"),
		Search: c.Query("search"),
	}
	if catID := c.Query("category_id"); catID != "" {
		id, _ := strconv.Atoi(catID)
		filters.CategoryID = uint(id)
	}

	if page := c.Query("page"); page != "" {
		filters.Page, _ = strconv.Atoi(page)
	}
	if limit := c.Query("limit"); limit != "" {
		filters.Limit, _ = strconv.Atoi(limit)
	}
	if dateFrom := c.Query("date_from"); dateFrom != "" {
		filters.DateFrom, _ = time.Parse("2006-01-02", dateFrom)
	}
	if dateTo := c.Query("date_to"); dateTo != "" {
		filters.DateTo, _ = time.Parse("2006-01-02", dateTo)
	}

	transactions, err := h.txService.GetAll(userID, filters)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(transactions)
}

func (h *TransactionHandler) GetOne(c fiber.Ctx) error {
	userID := c.Locals("userID").(uint)
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "ID inválido"})
	}

	tx, err := h.txService.GetOne(uint(id), userID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(tx)
}

func (h *TransactionHandler) Create(c fiber.Ctx) error {
	userID := c.Locals("userID").(uint)

	var req dtos.CreateTransactionRequest
	if err := c.Bind().Body(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Datos inválidos"})
	}

	tx, err := h.txService.Create(userID, req)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(fiber.StatusCreated).JSON(tx)
}

func (h *TransactionHandler) Update(c fiber.Ctx) error {
	userID := c.Locals("userID").(uint)
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "ID inválido"})
	}

	var req dtos.UpdateTransactionRequest
	if err := c.Bind().Body(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Datos inválidos"})
	}

	tx, err := h.txService.Update(uint(id), userID, req)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(tx)
}

func (h *TransactionHandler) Delete(c fiber.Ctx) error {
	userID := c.Locals("userID").(uint)
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "ID inválido"})
	}

	if err := h.txService.Delete(uint(id), userID); err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(fiber.StatusNoContent).Send(nil)
}
