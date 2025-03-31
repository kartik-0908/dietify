import OnboardingQuestionnaire from '@/components/onboarding-questions';
import type { NextPage } from 'next';

const OnboardingPage: NextPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <OnboardingQuestionnaire totalSteps={4} />
    </div>
  );
};

export default OnboardingPage;