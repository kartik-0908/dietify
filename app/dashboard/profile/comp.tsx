'use client'
import React, { useState } from 'react';
import { ChevronLeft, Edit2, Save } from "lucide-react";
import { Poppins } from 'next/font/google';
import { useRouter } from "next/navigation";
import { updateUserProfile } from '@/app/actions/user';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
    display: 'swap'
})

export default function Profile({ userData }: {
    userData: {
        email: string,
        firstName: string,
        lastName: string,
        dateOfBirth: Date,
        gender: string,
        height: number,
        weight: number,
    }
}) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        // activityLevel: userData?.activityLevel || '',
        dateOfBirth: userData?.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : '',
        // dietPreference: userData?.dietPreference || '',
        // diseases: userData?.diseases || [],
        gender: userData?.gender || '',
        // goal: userData?.goal || '',
        height: userData?.height ,
        weight: userData?.weight 
    });

    // const [diseaseInput, setDiseaseInput] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseFloat(value)
        }));
    }

    // const addDisease = () => {
    //     if (diseaseInput.trim() !== '' && !formData.diseases.includes(diseaseInput.trim())) {
    //         setFormData(prev => ({
    //             ...prev,
    //             diseases: [...prev.diseases, diseaseInput.trim()]
    //         }));
    //         setDiseaseInput('');
    //     }
    // };

    // const removeDisease = (index: number) => {
    //     setFormData(prev => ({
    //         ...prev,
    //         diseases: prev.diseases.filter((_: any, i: number) => i !== index)
    //     }));
    // };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Here you would typically send the updated data to your API
        try {
            const res = await updateUserProfile(formData);
            console.log(res);

            console.log("Profile updated:", formData);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className={`${poppins.variable} font-poppins flex flex-col items-start justify-start gap-4 py-20 bg-[#070417] text-white min-h-screen px-10`}>
            {/* Header with back button */}
            <div className="flex items-center gap-4 w-full mb-6">
                <button onClick={() => router.back()} className="p-2 rounded-full">
                    <ChevronLeft className="text-white" />
                </button>
                <p className="text-2xl font-bold">Profile</p>
                <button
                    onClick={() => isEditing ? handleSubmit(event) : setIsEditing(true)}
                    className="ml-auto p-2 rounded-full bg-[#232545]"
                >
                    {isEditing ? <Save className="text-[#4B89EC]" /> : <Edit2 className="text-[#4B89EC]" />}
                </button>
            </div>

            {/* Profile Image Section */}
            <div className="flex flex-col items-center w-full py-4">
                {/* <div className="relative mb-4">
                    <img
                        src={ || "/default-profile.png"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-[#4B89EC]"
                    />
                </div> */}
                <h2 className="text-xl font-bold">{userData ? `${userData.firstName} ${userData.lastName}` : "User"}</h2>
                <p className="text-[#ADA4A5]">{userData.email}</p>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="bg-[#232545] rounded-3xl p-6 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-[#4B89EC]">Personal Information</h3>

                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-[#ADA4A5] mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="bg-[#1C1E3A] text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4B89EC]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[#ADA4A5] mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="bg-[#1C1E3A] text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4B89EC]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[#ADA4A5] mb-1">Email Address</label>
                            <input
                                type="email"
                                value={userData.email}
                                disabled={true}
                                className="bg-[#1C1E3A] text-white p-3 rounded-xl opacity-80"
                            />
                            <p className="text-xs text-[#ADA4A5] mt-1">Email cannot be changed</p>
                        </div>

                        {/* <div className="flex flex-col">
                            <label className="text-[#ADA4A5] mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="bg-[#1C1E3A] text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4B89EC]"
                            />
                        </div> */}
                    </div>
                </div>

                <div className="bg-[#232545] rounded-3xl p-6 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-[#4B89EC]">Health Information</h3>

                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-[#ADA4A5] mb-1">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="bg-[#1C1E3A] text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4B89EC]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[#ADA4A5] mb-1">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleGenderChange}
                                disabled={!isEditing}
                                className="bg-[#1C1E3A] text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4B89EC]"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-[#ADA4A5] mb-1">Height (cm)</label>
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleWeightChange}
                                disabled={!isEditing}
                                className="bg-[#1C1E3A] text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4B89EC]"
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-[#ADA4A5] mb-1">Weight (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleWeightChange}
                                disabled={!isEditing}
                                className="bg-[#1C1E3A] text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4B89EC]"
                            />
                        </div>
                    </div>
                </div>

                {/* <div className="bg-[#232545] rounded-3xl p-6 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-[#4B89EC]">Fitness & Diet</h3>
                    
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-[#ADA4A5] mb-1">Activity Level</label>
                            <select
                                name="activityLevel"
                                value={formData.activityLevel}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="bg-[#1C1E3A] text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4B89EC]"
                            >
                                <option value="">Select Activity Level</option>
                                <option value="sedentary">Sedentary</option>
                                <option value="light">Light Activity</option>
                                <option value="moderate">Moderate Activity</option>
                                <option value="high">High Activity</option>
                                <option value="extreme">Extreme Activity</option>
                            </select>
                        </div>
                        
                        <div className="flex flex-col">
                            <label className="text-[#ADA4A5] mb-1">Diet Preference</label>
                            <select
                                name="dietPreference"
                                value={formData.dietPreference}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="bg-[#1C1E3A] text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4B89EC]"
                            >
                                <option value="">Select Diet Preference</option>
                                <option value="omnivore">Omnivore</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="vegan">Vegan</option>
                                <option value="paleo">Paleo</option>
                                <option value="keto">Keto</option>
                                <option value="glutenFree">Gluten Free</option>
                            </select>
                        </div>
                        
                        <div className="flex flex-col">
                            <label className="text-[#ADA4A5] mb-1">Fitness Goal</label>
                            <select
                                name="goal"
                                value={formData.goal}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="bg-[#1C1E3A] text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4B89EC]"
                            >
                                <option value="">Select Goal</option>
                                <option value="weightLoss">Weight Loss</option>
                                <option value="weightGain">Weight Gain</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="muscleGain">Muscle Gain</option>
                                <option value="endurance">Endurance</option>
                            </select>
                        </div>
                    </div>
                </div> */}

                {/* <div className="bg-[#232545] rounded-3xl p-6 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-[#4B89EC]">Medical Information</h3>
                    
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-[#ADA4A5] mb-1">Health Conditions</label>
                            {isEditing ? (
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={diseaseInput}
                                        onChange={(e) => setDiseaseInput(e.target.value)}
                                        placeholder="Add condition"
                                        className="bg-[#1C1E3A] text-white p-3 rounded-xl flex-1 focus:outline-none focus:ring-1 focus:ring-[#4B89EC]"
                                    />
                                    <button
                                        type="button"
                                        onClick={addDisease}
                                        className="bg-[#4B89EC] text-white px-4 rounded-xl"
                                    >
                                        Add
                                    </button>
                                </div>
                            ) : null}
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.diseases.length === 0 ? (
                                    <p className="text-[#ADA4A5] text-sm">No health conditions</p>
                                ) : (
                                    formData.diseases.map((disease : any, index : number) => (
                                        <div key={index} className="bg-[#1C1E3A] px-3 py-1 rounded-full flex items-center">
                                            <span>{disease}</span>
                                            {isEditing && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeDisease(index)}
                                                    className="ml-2 text-red-400"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div> */}

                {isEditing && (
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#4B89EC] to-[#6F42E3] py-4 rounded-2xl text-white font-medium text-lg"
                    >
                        Save Changes
                    </button>
                )}
            </form>
        </div>
    );
}