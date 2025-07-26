// Helper function to safely get available slots count
export const getAvailableSlotsCount = (timeSlots) => {
  if (!Array.isArray(timeSlots)) return 0
  return timeSlots.filter((slot) => slot && slot.available).length
}

// Helper function to safely check if turf has available slots
export const hasAvailableSlots = (timeSlots) => {
  if (!Array.isArray(timeSlots)) return false
  return timeSlots.some((slot) => slot && slot.available)
}

// Calculate total cart value
export const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => {
    const equipmentTotal = Array.isArray(item.equipment)
      ? item.equipment.reduce((eqTotal, eq) => eqTotal + (eq.price || 0) * (eq.quantity || 0), 0)
      : 0
    return total + (item.price || 0) + equipmentTotal
  }, 0)
}

// Share functionality with proper error handling
export const shareTurf = async (turf, setNotifications) => {
  if (!turf) return

  const shareData = {
    title: turf.name,
    text: turf.description,
    url: window.location.href,
  }

  try {
    // Check if Web Share API is supported and available
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData)
      return
    }
  } catch (error) {
    console.log("Web Share API failed:", error)
  }

  // Fallback to clipboard
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(window.location.href)
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: "Link copied to clipboard!",
          type: "success",
          time: "Just now",
        },
        ...prev,
      ])
      return
    }
  } catch (error) {
    console.log("Clipboard API failed:", error)
  }

  // Final fallback for older browsers
  try {
    const textArea = document.createElement("textarea")
    textArea.value = window.location.href
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)

    setNotifications((prev) => [
      {
        id: Date.now(),
        message: "Link copied to clipboard!",
        type: "success",
        time: "Just now",
      },
      ...prev,
    ])
  } catch (error) {
    console.log("All sharing methods failed:", error)
    setNotifications((prev) => [
      {
        id: Date.now(),
        message: "Unable to share. Please copy the URL manually.",
        type: "error",
        time: "Just now",
      },
      ...prev,
    ])
  }
}

// Get directions
export const getDirections = (turf, userLocation) => {
  if (!turf || !turf.coordinates) return
  const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${turf.coordinates.lat},${turf.coordinates.lng}`
  window.open(url, "_blank")
}
