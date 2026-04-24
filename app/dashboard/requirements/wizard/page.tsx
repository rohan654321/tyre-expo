'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// Import all your requirement components
import BasicInfoPage from '../basic-info/page';
import BoothDetailsPage from '../booth-details/page';
import ElectricalRequirementsPage from '../electrical/page';
import MachineryRequirementsPage from '../machinery/page';
import PersonnelRequirementsPage from '../personnel/page';
import FurnitureRequirementsPage from '../furniture/page';
import HostessServicesPage from '../hostess/page';
import CompressedAirPage from '../compressed-air/page';
import WaterConnectionPage from '../water/page';
import SecurityGuardsPage from '../security/page';
import HousekeepingPage from '../housekeeping/page';
import SecurityDepositPage from '../security-deposit/page';
import MachineDisplayPage from '../machine-display/page';
import RentalItemsPage from '../rental-items/page';

const requirementSteps = [
  { id: 0, name: 'Basic Information', component: BasicInfoPage, required: true, icon: '📋' },
  { id: 1, name: 'Booth Details', component: BoothDetailsPage, required: true, icon: '📍' },
  { id: 2, name: 'Machine Display', component: MachineDisplayPage, required: false, icon: '⚙️' },
  { id: 3, name: 'Electrical Load', component: ElectricalRequirementsPage, required: false, icon: '⚡' },
  { id: 4, name: 'Machinery Setup', component: MachineryRequirementsPage, required: false, icon: '🔧' },
  { id: 5, name: 'Personnel Passes', component: PersonnelRequirementsPage, required: false, icon: '👥' },
  { id: 6, name: 'Furniture Rental', component: FurnitureRequirementsPage, required: false, icon: '🪑' },
  { id: 7, name: 'AV & IT Rental', component: RentalItemsPage, required: false, icon: '💻' },
  { id: 8, name: 'Hostess Services', component: HostessServicesPage, required: false, icon: '✨' },
  { id: 9, name: 'Compressed Air', component: CompressedAirPage, required: false, icon: '💨' },
  { id: 10, name: 'Water Connection', component: WaterConnectionPage, required: false, icon: '💧' },
  { id: 11, name: 'Security Guards', component: SecurityGuardsPage, required: false, icon: '🛡️' },
  { id: 12, name: 'Housekeeping', component: HousekeepingPage, required: false, icon: '🧹' },
  { id: 13, name: 'Security Deposit', component: SecurityDepositPage, required: false, icon: '💰' },
];

export default function RequirementsWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [skippedSteps, setSkippedSteps] = useState<number[]>([]);

  const CurrentComponent = requirementSteps[currentStep].component;
  const isRequired = requirementSteps[currentStep].required;
  const isCompleted = completedSteps.includes(currentStep);
  const isSkipped = skippedSteps.includes(currentStep);

  const handleNext = () => {
    if (currentStep < requirementSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // All steps completed
      router.push('/dashboard/requirements');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    handleNext();
  };

  const handleSkip = () => {
    if (!skippedSteps.includes(currentStep) && !isRequired) {
      setSkippedSteps([...skippedSteps, currentStep]);
    }
    handleNext();
  };

  const goToStep = (stepIndex: number) => {
    // Only allow going to previous steps or completed steps
    if (stepIndex <= currentStep || completedSteps.includes(stepIndex)) {
      setCurrentStep(stepIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getStepStatus = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) return 'completed';
    if (skippedSteps.includes(stepIndex)) return 'skipped';
    if (stepIndex === currentStep) return 'current';
    if (stepIndex < currentStep) return 'past';
    return 'upcoming';
  };

  const progressPercentage = ((completedSteps.length + skippedSteps.length) / requirementSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Setup Your Exhibition Requirements</h1>
            <button
              onClick={() => router.push('/dashboard/requirements')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Save & Exit
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">
            Step {currentStep + 1} of {requirementSteps.length} • 
            {completedSteps.length + skippedSteps.length} completed
          </p>
        </div>

        {/* Stepper Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {requirementSteps.map((step, index) => {
              const status = getStepStatus(index);
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    status === 'current' 
                      ? 'bg-amber-50 border border-amber-200' 
                      : status === 'completed' 
                      ? 'text-green-600 hover:bg-green-50'
                      : status === 'skipped'
                      ? 'text-gray-400 line-through hover:bg-gray-50'
                      : index < currentStep
                      ? 'text-gray-500 hover:bg-gray-50'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                  disabled={status === 'upcoming' && !completedSteps.includes(index)}
                >
                  {status === 'completed' ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <span className="text-lg">{step.icon}</span>
                  )}
                  <span className="text-sm font-medium hidden sm:inline">{step.name}</span>
                  {step.required && (
                    <span className="text-xs text-red-400 ml-1">*</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{requirementSteps[currentStep].icon}</span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {requirementSteps[currentStep].name}
                  </h2>
                  {isRequired && (
                    <span className="text-xs text-red-500">Required step</span>
                  )}
                </div>
              </div>
              {isSkipped && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">Skipped</span>
              )}
            </div>
          </div>

          {/* Render the actual form component */}
          <div className="min-h-[400px]">
            <CurrentComponent />
          </div>

          {/* Override the form submission for wizard */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
              Previous
            </button>
            
            <div className="flex gap-3">
              {!isRequired && !isCompleted && !isSkipped && (
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-6 py-2.5 border border-gray-300 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition"
                >
                  Skip for Now
                </button>
              )}
              
              <button
                type="button"
                onClick={handleComplete}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:from-amber-600 hover:to-orange-600 transition flex items-center gap-2"
              >
                {currentStep === requirementSteps.length - 1 ? 'Finish' : 'Save & Continue'}
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Summary of Completed Steps */}
        {(completedSteps.length > 0 || skippedSteps.length > 0) && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4">
            <h3 className="font-semibold text-green-800 mb-2">✓ Completed</h3>
            <div className="flex flex-wrap gap-2">
              {completedSteps.map(stepIndex => (
                <span key={stepIndex} className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                  {requirementSteps[stepIndex].name}
                </span>
              ))}
              {skippedSteps.map(stepIndex => (
                <span key={stepIndex} className="px-2 py-1 bg-gray-100 text-gray-500 text-sm rounded-full line-through">
                  {requirementSteps[stepIndex].name} (skipped)
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}