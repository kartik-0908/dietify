import React from 'react';
import { Star } from 'lucide-react';

// Define the prop types for the TestimonialCard component
interface TestimonialCardProps {
  testimony: string;
  userName: string;
  userTitle: string;
  userImage: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimony, 
  userName, 
  userTitle, 
  userImage 
}) => {
  return (
    <div  className="h-[350px] w-80 border-b-4 border-b-[#BB5200] overflow-hidden rounded-none bg-transparent">
      <div className="flex flex-col p-6 pt-8 space-y-6 h-full bg-[#050505] bg-opacity-40 text-white rounded-none">
        {/* Testimony Text */}
        <p className="text-left text-gray-300  text-base flex-grow">
          {testimony}
        </p>
        
        {/* Star Rating */}
        <div className="flex text-[#BB5200] mb-4 justify-start">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className="w-5 h-5 stroke-[#BB5200] stroke-2 fill-none mr-1" 
            />
          ))}
        </div>
        
        {/* User Info */}
        <div className="flex items-start space-x-4 w-full">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src={userImage} 
              alt={`${userName} Testimonial`} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-white">{userName}</h3>
            <p className="text-gray-400 text-sm">{userTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;