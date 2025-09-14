import React, { useState, useEffect } from "react";
// Use service layer instead of direct axios
import { fetchTurfs as fetchTurfsService, createTurf, updateTurf, deleteTurf } from "../services/turfAdminService";
import toast from "react-hot-toast";
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  X,
  MapPin,
  Tag,
  Clock,
  Users
} from "lucide-react";

export default function TurfAdminTurfs() {
  const [turfs, setTurfs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTurfId, setEditTurfId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    sportType: "football",
    pricePerHour: "",
    amenities: [],
    images: []
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const sportTypes = [
    { value: "football", label: "Football" },
    { value: "cricket", label: "Cricket" },
    { value: "basketball", label: "Basketball" },
    { value: "volleyball", label: "Volleyball" },
    { value: "badminton", label: "Badminton" },
    { value: "tennis", label: "Tennis" },
    { value: "multiple", label: "Multiple Sports" }
  ];

  const amenityOptions = [
    "Changing Rooms",
    "Showers",
    "Washrooms",
    "Drinking Water",
    "Flood Lights",
    "Parking",
    "Seating",
    "Equipment Rental",
    "Cafeteria"
  ];

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTurfsService();
      setTurfs(data);
    } catch (err) {
      console.error("Error fetching turfs:", err);
      toast.error("Could not fetch turfs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, amenities: [...formData.amenities, value] });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(item => item !== value)
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
    
    // Preview images
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviewImages]);
  };

  const removePreviewImage = (index) => {
    const updatedPreviews = [...previewImages];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
    
    const updatedFiles = [...imageFiles];
    updatedFiles.splice(index, 1);
    setImageFiles(updatedFiles);
  };

  const openModal = (turf = null) => {
    if (turf) {
      setEditTurfId(turf._id);
      setFormData({
        name: turf.name,
        location: turf.location,
        description: turf.description,
        sportType: turf.sportType,
        pricePerHour: turf.pricePerHour.toString(),
        amenities: turf.amenities || [],
        images: turf.images || []
      });
      // Set preview images for existing images
      setPreviewImages(turf.images || []);
    } else {
      // Reset form for new turf
      setEditTurfId(null);
      setFormData({
        name: "",
        location: "",
        description: "",
        sportType: "football",
        pricePerHour: "",
        amenities: [],
        images: []
      });
      setPreviewImages([]);
      setImageFiles([]);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.pricePerHour) {
      return toast.error("Please fill all required fields");
    }
    
    try {
      const turfData = new FormData();
      turfData.append("name", formData.name);
      turfData.append("location", formData.location);
      turfData.append("description", formData.description);
      turfData.append("sportType", formData.sportType);
      turfData.append("pricePerHour", formData.pricePerHour);
      turfData.append("amenities", JSON.stringify(formData.amenities));
      
      // Add new images
      imageFiles.forEach(file => {
        turfData.append("images", file);
      });
      
      if (editTurfId) {
        await updateTurf(editTurfId, turfData);
        toast.success("Turf updated successfully");
      } else {
        await createTurf(turfData);
        toast.success("Turf created successfully");
      }
      
      // Refresh turf list
      fetchTurfs();
      setShowModal(false);
    } catch (err) {
      console.error("Error saving turf:", err);
      toast.error("Failed to save turf");
    }
  };

  const handleDeleteTurf = async (id) => {
    if (window.confirm("Are you sure you want to delete this turf?")) {
      try {
  await deleteTurf(id);
        toast.success("Turf deleted successfully");
        // Refresh turf list
        fetchTurfs();
      } catch (err) {
        console.error("Error deleting turf:", err);
        toast.error("Failed to delete turf");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage Turfs</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add New Turf
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {turfs.map(turf => (
            <div key={turf._id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
              <div className="h-48 w-full relative">
                <img
                  src={turf.images[0] || "https://via.placeholder.com/400x200?text=No+Image"}
                  alt={turf.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  {turf.rating || 0}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="font-bold text-white">{turf.name}</h3>
                </div>
              </div>
              
              <div className="p-4 flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                  {turf.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Tag className="h-4 w-4 mr-1 text-gray-400" />
                  {sportTypes.find(s => s.value === turf.sportType)?.label || turf.sportType}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" />
                  ₹{turf.pricePerHour}/hour
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{turf.description}</p>
                
                {turf.amenities && turf.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {turf.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="text-xs bg-green-50 text-green-700 rounded-full px-2 py-0.5">
                        {amenity}
                      </span>
                    ))}
                    {turf.amenities.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
                        +{turf.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 p-4 flex justify-end space-x-2">
                <button
                  onClick={() => openModal(turf)}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTurf(turf._id)}
                  className="px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {turfs.length === 0 && (
            <div className="col-span-full bg-white p-8 rounded-lg shadow text-center">
              <h3 className="text-lg font-medium text-gray-900">No turfs found</h3>
              <p className="mt-1 text-gray-500">Add your first turf to get started.</p>
              <button
                onClick={() => openModal()}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Turf
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Turf Modal */}
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  {editTurfId ? "Edit Turf" : "Add New Turf"}
                </h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {/* Name */}
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="sm:col-span-3">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>

                  {/* Sport Type */}
                  <div className="sm:col-span-3">
                    <label htmlFor="sportType" className="block text-sm font-medium text-gray-700">
                      Sport Type *
                    </label>
                    <select
                      id="sportType"
                      name="sportType"
                      value={formData.sportType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    >
                      {sportTypes.map(sport => (
                        <option key={sport.value} value={sport.value}>
                          {sport.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Per Hour */}
                  <div className="sm:col-span-3">
                    <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-700">
                      Price Per Hour (₹) *
                    </label>
                    <input
                      type="number"
                      id="pricePerHour"
                      name="pricePerHour"
                      value={formData.pricePerHour}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>

                  {/* Images */}
                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Images</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                          >
                            <span>Upload files</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              multiple
                              className="sr-only"
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>

                    {/* Preview images */}
                    {previewImages.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {previewImages.map((src, index) => (
                            <div key={index} className="relative">
                              <img
                                src={src}
                                alt={`Preview ${index}`}
                                className="h-24 w-full object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removePreviewImage(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Amenities */}
                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {amenityOptions.map(amenity => (
                        <div key={amenity} className="flex items-center">
                          <input
                            id={`amenity-${amenity}`}
                            name="amenities"
                            type="checkbox"
                            value={amenity}
                            checked={formData.amenities.includes(amenity)}
                            onChange={handleAmenityChange}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`amenity-${amenity}`} className="ml-2 block text-sm text-gray-700">
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    {editTurfId ? "Update Turf" : "Add Turf"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}