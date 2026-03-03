package handlers

import (
	"moneyWise/services"

	"github.com/gofiber/fiber/v3"
)

type AnalyticsHandler struct {
	analyticsService *services.AnalyticsService
}

func NewAnalyticsHandler(analyticsService *services.AnalyticsService) *AnalyticsHandler {
	return &AnalyticsHandler{analyticsService: analyticsService}
}

func (h *AnalyticsHandler) GetDashboard(c fiber.Ctx) error {
	userID := c.Locals("userID").(uint)

	dashboard, err := h.analyticsService.GetDashboard(userID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.JSON(dashboard)
}
