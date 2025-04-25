'use client'
import React, { useState } from 'react';
import CalendarIcon from './icons/calender';
import WeightIcon from './icons/weight';
import HeightIcon from './icons/height';
import { CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { createProfile } from '@/app/actions/user';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'

interface QuestionnaireProps {
    totalSteps: number;
}

const OnboardingQuestionnaire: React.FC<QuestionnaireProps> = ({ totalSteps = 4 }) => {
    const router = useRouter()
    const {user , isLoaded} = useUser();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedGender, setSelectedGender] = useState<string>('male');
    const [selectedDiet, setSelectedDiet] = useState("veg");
    const [selectedActivity, setSelectedActivity] = useState("");
    const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
    const [dateOfBirth, setDateOfBirth] = useState("2000-01-01");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    if(!isLoaded) return <div>Loading...</div>
    if(!user) return <div>Not signed in</div>
    if(user.id === undefined) return <div>Not signed in</div>
   

    const diseases = [
        "PCOD",
        "Diabetes",
        "Pre-Diabetes",
        "Cholesterol",
        "Physical Injury",
        "Thyroid",
        "Hypertension",
        "None of these"
    ];

    const toggleDisease = (disease: string) => {
        setSelectedDiseases((prev: string[]) =>
            prev.includes(disease) ? prev.filter((d) => d !== disease) : [...prev, disease]
        );
    };



    const handleNext = () => {
        if (selectedOption === null && currentStep === 1) {
            toast({
                title: "Please select an option",
                description: "Please select an option",
                variant: "destructive",
                duration: 3000,
            })
            return;
        }
        if (dateOfBirth === "" && currentStep === 2) {
            toast({
                title: "Please enter your date of birth",
                description: "Please enter your date of birth",
                variant: "destructive",
                duration: 3000,
            })
            return;
        }
        if (weight === "" && currentStep === 2) {
            toast({
                title: "Please enter your weight",
                description: "Please enter your weight",
                variant: "destructive",
                duration: 3000,
            })
            return;
        }
        if (height === "" && currentStep === 2) {
            toast({
                title: "Please enter your height",
                description: "Please enter your height",
                variant: "destructive",
                duration: 3000,
            })
            return;
        }
        if(selectedActivity === "" && currentStep === 3) {
            toast({
                title: "Please select your activity level",
                description: "Please select your activity level",
                variant: "destructive",
                duration: 3000,
            })
            return;
        }
        setCurrentStep(currentStep + 1);
    };

    const handleComplete = async ()=>{
        const res = await createProfile(user?.id, selectedGender, new Date(dateOfBirth), parseFloat(weight), parseFloat(height), selectedOption as string, selectedActivity, selectedDiseases, selectedDiet)
        console.log(res)
        toast(
            {
                title: "Profile created successfully",
                description: "Profile created successfully",
                duration: 3000,
            }
            
        )
        router.push('/dashboard/home')
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const options = [
        { id: "fat_loss", label: "Fat Loss", description: "Ideal for obese individuals" },
        { id: "muscle_gain", label: "Muscle Gain", description: "Ideal for skinny individuals" },
        { id: "body_recomp", label: "Body Recomposition", description: "Ideal for skinny fat individuals" }
    ];

    const genders = [
        { id: "male", label: "Male" },
        { id: "female", label: "Female" },
        { id: "other", label: "Other" }
    ];




    return (
        <div className="min-h-screen flex flex-col pt-4" style={{ backgroundColor: '#070417' }}>
            {/* Progress bar with dots */}
            <div className="py-4 px-6">
                <div className="relative flex justify-between">
                    {/* Horizontal line spanning across all dots */}
                    <div className="absolute top-2.5 left-0 right-0 h-0.5 bg-gray-600"></div>

                    {/* Completed line (scales with progress) */}
                    <div
                        className="absolute top-2.5 left-0 h-0.5 bg-white"
                        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                    ></div>

                    {/* Dots/checkmarks on top of the line */}
                    {Array.from({ length: totalSteps }, (_, i) => (
                        <div key={i} className="z-10 flex flex-col items-center">
                            {i + 1 < currentStep ? (
                                /* Completed step with tick mark */
                                <div className="h-5 w-5 rounded-full bg-white flex items-center justify-center">
                                    <svg className="h-3 w-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            ) : i + 1 === currentStep ? (
                                /* Current step (solid white dot) */
                                <div className="h-5 w-5 rounded-full bg-white"></div>
                            ) : (
                                /* Pending step (gray circle with small white dot inside) */
                                <div className="h-5 w-5 rounded-full bg-gray-600 flex items-center justify-center">
                                    <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content area with second background */}
            <div className="flex-1 flex flex-col mt-6 relative">
                {/* Question header - dark background (#070417) */}
                <div
                    className="px-6 py-8 rounded-t-3xl"
                    style={{ backgroundColor: '#070417' }}
                >
                    <h2 className="text-2xl font-bold text-white">
                        {currentStep === 1 && "What is your goal ?"}
                        {currentStep === 2 && "Add your body stats for a personalised workout experience!"}
                        {currentStep === 3 && "Activity Level"}
                        {currentStep === 4 && "Any Medical Condition ?"}
                    </h2>
                </div>

                {/* Options section - second background (#232645) */}
                <div
                    className="flex-1 px-6 py-8 rounded-t-3xl -mt-4"
                    style={{ backgroundColor: '#232645' }}
                >
                    {/* Options content */}
                    <div className="flex-1">
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <div>
                                    <div className="mt-4 space-y-12">
                                        {options.map((option: {
                                            id: string,
                                            label: string,
                                            description: string
                                        }) => (
                                            <label
                                                key={option.id}
                                                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all `}
                                                onClick={() => setSelectedOption(option.id)}
                                            >
                                                <div className="ml-3 text-center w-full">
                                                    <span className={`block font-semibold text-lg ${selectedOption === option.id ? "text-[#2F6DE9]" : "text-gray-200"}`} style={{ fontSize: "1.25rem" }}>
                                                        {option.label}
                                                    </span>
                                                    <span className={`block text-sm ${selectedOption === option.id ? "text-[#2F6DE9]" : "text-gray-400"}`}>
                                                        {option.description}
                                                    </span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6">
                                {/* Gender Selection as Single Tab */}
                                <div className="flex w-full rounded-lg overflow-hidden bg-[#2E0DDF1A]">
                                    {genders.map((gender) => (
                                        <button
                                            key={gender.id}
                                            className={`flex-1 py-2 text-center transition-all 
              ${selectedGender === gender.id ? "bg-white text-indigo-600 font-bold rounded-3xl" : "text-white"}`}
                                            onClick={() => setSelectedGender(gender.id)}
                                        >
                                            {gender.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Date of Birth Input */}
                                <div className="flex items-center bg-white p-2 rounded-2xl border border-gray-400 relative">
                                    <CalendarIcon />
                                    <input
                                        type="date"
                                        className="w-full bg-transparent text-gray-900 placeholder-[#ADA4A5] focus:outline-none pl-10"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        placeholder="Date of Birth"
                                    />
                                </div>

                                {/* Weight Input */}
                                <div className="flex items-center">
                                    <div className="flex items-center bg-white p-2 rounded-2xl border border-gray-400">
                                        <WeightIcon />
                                        <input
                                            type="number"
                                            className="w-full bg-transparent text-gray-900 placeholder-[#ADA4A5] focus:outline-none pl-3"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            placeholder="Weight"
                                        />
                                    </div>
                                    <div className="uppercase ml-2 px-4 py-2 bg-[#1D61E7] text-white rounded-lg">
                                        kg
                                    </div>
                                </div>


                                {/* Height Input with SVG Icon */}
                                <div className="flex items-center">
                                    <div className="flex items-center p-2 bg-white rounded-2xl border border-gray-400">
                                        <HeightIcon />
                                        <input
                                            type="number"
                                            className="w-full bg-white text-gray-900 placeholder-[#ADA4A5] focus:outline-none pl-3"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            placeholder="Height"
                                        />
                                    </div>
                                    <div className="uppercase ml-2 px-4 py-2 bg-[#1D61E7] text-white rounded-lg">
                                        cm
                                    </div>
                                </div>



                                {/* Diet Preference Selection */}
                                <div className="flex space-x-4">
                                    {["Veg", "Non-Veg", "Vegan"].map((diet) => (
                                        <label key={diet} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="diet"
                                                value={diet.toLowerCase()}
                                                checked={selectedDiet === diet.toLowerCase()}
                                                onChange={() => setSelectedDiet(diet.toLowerCase())}
                                                className="w-6 h-6 bg-white border border-gray-400 rounded-md appearance-none checked:bg-indigo-600 checked:border-indigo-600"
                                            />
                                            <span className={`text-white font-medium`}>
                                                {diet}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <p className="block text-sm font-medium text-gray-200 text-center">
                                    How would you rate your activity level?
                                </p>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { label: "Sedentary", description: "Almost no exercise" },
                                        { label: "Light Exercise", description: "1 to 3 days per week" },
                                        { label: "Moderate Exercise", description: "3 to 5 days per week" },
                                        { label: "Heavy Exercise", description: "6 to 7 days per week" },
                                        { label: "Athlete", description: "Daily intense workouts" },
                                    ].map((option) => {
                                        const isSelected = selectedActivity === option.label;

                                        return (
                                            <button
                                                key={option.label}
                                                className={`w-full px-4 py-3 rounded-lg border transition flex flex-col items-center 
                    ${isSelected
                                                        ? "border-white shadow-md" // Selected state
                                                        : "bg-white border-gray-300 hover:bg-gray-100 text-gray-900"
                                                    }`}
                                                onClick={() => setSelectedActivity(option.label)}
                                            >
                                                <span
                                                    className={`text-lg font-semibold ${option.label === "Sedentary" && !isSelected ? "text-[#232645]" : ""
                                                        }`}
                                                >
                                                    {option.label}
                                                </span>
                                                <span
                                                    className={`text-sm ${option.label === "Sedentary" && !isSelected
                                                        ? "text-[#ADA4A5]"
                                                        : "text-gray-600"
                                                        }`}
                                                >
                                                    {option.description}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}


                        {currentStep === 4 && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {diseases.map((disease) => {
                                        const isSelected = selectedDiseases.includes(disease);

                                        return (
                                            <button
                                                key={disease}
                                                className={` w-full flex items-center justify-center px-3 py-2 rounded-lg transition relative
                    ${isSelected
                                                        ? "border border-green-500 text-white bg-gray-800 "
                                                        : "border-gray-300 bg-gray-700 hover:bg-gray-600 text-gray-200 bg-[#000000]"
                                                    }`}
                                                onClick={() => toggleDisease(disease)}
                                            >
                                                {disease}
                                                {isSelected && <CheckCircle className="absolute right-2 w-5 h-5 text-green-500" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation buttons */}
                    {currentStep === 1 && (
                        <div className="mt-8">
                            <button
                                onClick={handleNext}
                                className="w-full py-3 rounded-md text-white font-medium"
                                style={{ backgroundColor: '#1D61E7' }}
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {/* Keep the original navigation for other steps */}
                    {currentStep > 1 && (
                        <div className="flex justify-between mt-8">
                            <button
                                onClick={handlePrevious}
                                className="px-4 py-2 rounded-md bg-gray-700 text-white"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                className={`px-4 py-2 rounded-md bg-[#1D61E7] text-white ${currentStep === totalSteps ? 'hidden' : ''
                                    }`}
                            >
                                Next
                            </button>
                            {currentStep === totalSteps && (
                                <button
                                    className="px-4 py-2 rounded-md bg-green-600 text-white"
                                    onClick={handleComplete}

                                >
                                    Complete
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OnboardingQuestionnaire;
