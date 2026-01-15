import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, Lock, LogOut, Edit2, Save, X, Camera, MapPin, Calendar } from "lucide-react";
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
  
  // Profile state
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

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Profile handlers
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
      // TODO: Replace with actual API call
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

  // Password handlers
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
      // TODO: Replace with actual API call
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
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-lg text-gray-700 mt-3 font-medium">Manage your account information and security</p>
          </div>

          {/* Profile Card */}
          <Card className="mb-6 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20 bg-gradient-to-br from-green-400 to-green-600">
                      <AvatarImage src={profileImage || ""} />
                      <AvatarFallback className="text-white font-semibold text-lg">
                        {profileData.firstName[0]}{profileData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {isEditingProfile && (
                      <label className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white rounded-full p-2 cursor-pointer transition">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {profileData.firstName} {profileData.lastName}
                    </h2>
                    <p className="text-gray-600">{profileData.email}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="profile" className="data-[state=active]:bg-white">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-white">
                <Lock className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your profile details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* First Name */}
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleProfileChange}
                          disabled={!isEditingProfile}
                          className={profileErrors.firstName ? "border-red-500" : ""}
                        />
                        {profileErrors.firstName && (
                          <p className="text-sm text-red-500">{profileErrors.firstName}</p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleProfileChange}
                          disabled={!isEditingProfile}
                          className={profileErrors.lastName ? "border-red-500" : ""}
                        />
                        {profileErrors.lastName && (
                          <p className="text-sm text-red-500">{profileErrors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        disabled={!isEditingProfile}
                        className={profileErrors.email ? "border-red-500" : ""}
                      />
                      {profileErrors.email && (
                        <p className="text-sm text-red-500">{profileErrors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        disabled={!isEditingProfile}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                      {!isEditingProfile ? (
                        <Button
                          onClick={() => setIsEditingProfile(true)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <>
                          <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditingProfile(false)}
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
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Change Password Section */}
                  {!isChangingPassword ? (
                    <Button
                      onClick={() => setIsChangingPassword(true)}
                      variant="outline"
                      className="border-gray-300"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  ) : (
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      {/* Current Password */}
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter your current password"
                          className={passwordErrors.currentPassword ? "border-red-500" : ""}
                        />
                        {passwordErrors.currentPassword && (
                          <p className="text-sm text-red-500">{passwordErrors.currentPassword}</p>
                        )}
                      </div>

                      {/* New Password */}
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter your new password"
                          className={passwordErrors.newPassword ? "border-red-500" : ""}
                        />
                        {passwordErrors.newPassword && (
                          <p className="text-sm text-red-500">{passwordErrors.newPassword}</p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          placeholder="Confirm your new password"
                          className={passwordErrors.confirmPassword ? "border-red-500" : ""}
                        />
                        {passwordErrors.confirmPassword && (
                          <p className="text-sm text-red-500">{passwordErrors.confirmPassword}</p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t">
                        <Button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700"
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
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}

                  {/* Logout Section */}
                  <div className="pt-4 border-t">
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="w-full"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
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
