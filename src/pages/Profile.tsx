import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, Lock, LogOut, Edit2, Save, X, Camera, MapPin, Calendar, Phone, Shield, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  bio: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main Street",
    city: "New York",
    country: "USA",
    bio: "Fresh produce enthusiast and organic food lover",
    dateOfBirth: "1990-01-15",
  });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    if (profileErrors[name]) {
      setProfileErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileErrors({});

    const result = profileSchema.safeParse(profileData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setProfileErrors(fieldErrors);
      return;
    }

    try {
      console.log("Profile data:", result.data);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditingProfile(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrors({});

    const result = passwordSchema.safeParse(passwordData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setPasswordErrors(fieldErrors);
      return;
    }

    try {
      console.log("Password change requested");
      toast({
        title: "Success",
        description: "Password changed successfully",
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsChangingPassword(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-5xl mx-auto">
          {/* Animated Header */}
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3 animate-fade-in">
              Profile Settings
            </h1>
            <p className="text-lg text-gray-600 font-medium">Manage your account information and security preferences</p>
          </div>

          {/* Enhanced Profile Card */}
          <Card className="mb-8 border-0 shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-emerald-400/10 to-teal-400/10"></div>
            <CardHeader className="pb-6 relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative group">
                  <Avatar className="h-28 w-28 ring-4 ring-white shadow-xl bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 transition-transform group-hover:scale-105">
                    <AvatarImage src={profileImage || ""} />
                    <AvatarFallback className="text-white font-bold text-2xl">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditingProfile && (
                    <label className="absolute bottom-0 right-0 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full p-2.5 cursor-pointer transition-all shadow-lg hover:shadow-xl transform hover:scale-110">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-lg">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-3">
                    <Mail className="w-4 h-4 text-green-600" />
                    {profileData.email}
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {profileData.city}, {profileData.country}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      <Phone className="w-3.5 h-3.5" />
                      {profileData.phone}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Enhanced Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-xl shadow-lg border-0">
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-lg transition-all duration-300 font-semibold"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-lg transition-all duration-300 font-semibold"
              >
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-2xl font-bold text-gray-900">Personal Information</CardTitle>
                  <CardDescription className="text-base">Update your profile details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleProfileChange}
                          disabled={!isEditingProfile}
                          className={`transition-all ${profileErrors.firstName ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"} ${!isEditingProfile && "bg-gray-50"}`}
                        />
                        {profileErrors.firstName && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <X className="w-3.5 h-3.5" />
                            {profileErrors.firstName}
                          </p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleProfileChange}
                          disabled={!isEditingProfile}
                          className={`transition-all ${profileErrors.lastName ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"} ${!isEditingProfile && "bg-gray-50"}`}
                        />
                        {profileErrors.lastName && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <X className="w-3.5 h-3.5" />
                            {profileErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Mail className="w-4 h-4 text-green-600" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        disabled={!isEditingProfile}
                        className={`transition-all ${profileErrors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"} ${!isEditingProfile && "bg-gray-50"}`}
                      />
                      {profileErrors.email && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <X className="w-3.5 h-3.5" />
                          {profileErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Phone className="w-4 h-4 text-green-600" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        disabled={!isEditingProfile}
                        className={`transition-all focus:ring-green-500 ${!isEditingProfile && "bg-gray-50"}`}
                      />
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm font-semibold text-gray-700">Bio</Label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        disabled={!isEditingProfile}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-md transition-all focus:ring-2 focus:ring-green-500 focus:border-transparent ${!isEditingProfile && "bg-gray-50"}`}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-6 border-t border-gray-100">
                      {!isEditingProfile ? (
                        <Button
                          type="button"
                          onClick={() => setIsEditingProfile(true)}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditingProfile(false)}
                            className="border-2 hover:bg-gray-50 transition-all"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-2xl font-bold text-gray-900">Security Settings</CardTitle>
                  <CardDescription className="text-base">Manage your account security and password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Change Password Section */}
                  {!isChangingPassword ? (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <Lock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">Password Protection</h3>
                          <p className="text-sm text-gray-600 mb-4">Keep your account secure by using a strong password</p>
                          <Button
                            onClick={() => setIsChangingPassword(true)}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
                          >
                            <Lock className="w-4 h-4 mr-2" />
                            Change Password
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleChangePassword} className="space-y-5 bg-gray-50 p-6 rounded-xl">
                      {/* Current Password */}
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-sm font-semibold text-gray-700">Current Password</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter your current password"
                          className={`transition-all ${passwordErrors.currentPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"}`}
                        />
                        {passwordErrors.currentPassword && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <X className="w-3.5 h-3.5" />
                            {passwordErrors.currentPassword}
                          </p>
                        )}
                      </div>

                      {/* New Password */}
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm font-semibold text-gray-700">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter your new password"
                          className={`transition-all ${passwordErrors.newPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"}`}
                        />
                        {passwordErrors.newPassword && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <X className="w-3.5 h-3.5" />
                            {passwordErrors.newPassword}
                          </p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          placeholder="Confirm your new password"
                          className={`transition-all ${passwordErrors.confirmPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"}`}
                        />
                        {passwordErrors.confirmPassword && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <X className="w-3.5 h-3.5" />
                            {passwordErrors.confirmPassword}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Update Password
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsChangingPassword(false);
                            setPasswordData({
                              currentPassword: "",
                              newPassword: "",
                              confirmPassword: "",
                            });
                            setPasswordErrors({});
                          }}
                          className="border-2 hover:bg-gray-50 transition-all"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}

                  {/* Logout Section */}
                  <div className="pt-6 border-t border-gray-100">
                    <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-xl border border-red-100">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-100 p-3 rounded-lg">
                          <LogOut className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">Sign Out</h3>
                          <p className="text-sm text-gray-600 mb-4">End your current session and return to login</p>
                          <Button
                            onClick={handleLogout}
                            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-md hover:shadow-lg transition-all"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;