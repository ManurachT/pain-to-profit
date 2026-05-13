import { useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import TeamSetupPage from './pages/TeamSetupPage';
import CaseSelectPage from './pages/CaseSelectPage';
import Stage1Page from './pages/Stage1Page';
import Stage2Page from './pages/Stage2Page';
import Stage3Page from './pages/Stage3Page';
import Stage4Page from './pages/Stage4Page';
import FinalPage from './pages/FinalPage';

const INITIAL_STATE = {
  page: 'welcome',
  teamName: '',
  playerCount: 4,
  selectedCase: null,
  selectedPainPoints: [],
  businessImpact: '',
  stage1Score: 0,
  selectedTools: [],
  toolReason: '',
  stage2Score: 0,
  selectedData: [],
  dataDetails: {},
  stage3Score: 0,
  currentHours: '',
  targetHours: '',
  costPerHour: '',
  investmentCost: '',
  intangibleBenefit: '',
  pitchSummary: '',
  stage4Score: 0,
};

export default function App() {
  const [state, setState] = useState(INITIAL_STATE);
  const update = (patch) => setState((s) => ({ ...s, ...patch }));
  const resetGame = () => setState(INITIAL_STATE);
  const totalScore = state.stage1Score + state.stage2Score + state.stage3Score + state.stage4Score;

  const pages = {
    welcome: <WelcomePage onStart={() => update({ page: 'teamSetup' })} />,
    teamSetup: (
      <TeamSetupPage
        teamName={state.teamName}
        playerCount={state.playerCount}
        onUpdate={update}
        onNext={() => update({ page: 'caseSelect' })}
        onBack={() => update({ page: 'welcome' })}
      />
    ),
    caseSelect: (
      <CaseSelectPage
        onSelect={(c) => update({ selectedCase: c, page: 'stage1' })}
        onBack={() => update({ page: 'teamSetup' })}
      />
    ),
    stage1: (
      <Stage1Page
        selectedCase={state.selectedCase}
        selectedPainPoints={state.selectedPainPoints}
        businessImpact={state.businessImpact}
        onUpdate={update}
        onNext={(score) => update({ stage1Score: score, page: 'stage2' })}
        onBack={() => update({ page: 'caseSelect' })}
      />
    ),
    stage2: (
      <Stage2Page
        selectedCase={state.selectedCase}
        selectedPainPoints={state.selectedPainPoints}
        selectedTools={state.selectedTools}
        toolReason={state.toolReason}
        onUpdate={update}
        onNext={(score) => update({ stage2Score: score, page: 'stage3' })}
        onBack={() => update({ page: 'stage1' })}
      />
    ),
    stage3: (
      <Stage3Page
        selectedCase={state.selectedCase}
        selectedData={state.selectedData}
        dataDetails={state.dataDetails}
        onUpdate={update}
        onNext={(score) => update({ stage3Score: score, page: 'stage4' })}
        onBack={() => update({ page: 'stage2' })}
      />
    ),
    stage4: (
      <Stage4Page
        selectedCase={state.selectedCase}
        selectedPainPoints={state.selectedPainPoints}
        selectedTools={state.selectedTools}
        selectedData={state.selectedData}
        currentHours={state.currentHours}
        targetHours={state.targetHours}
        costPerHour={state.costPerHour}
        investmentCost={state.investmentCost}
        intangibleBenefit={state.intangibleBenefit}
        pitchSummary={state.pitchSummary}
        onUpdate={update}
        onNext={(score) => update({ stage4Score: score, page: 'final' })}
        onBack={() => update({ page: 'stage3' })}
      />
    ),
    final: (
      <FinalPage
        teamName={state.teamName}
        selectedCase={state.selectedCase}
        totalScore={totalScore}
        stage1Score={state.stage1Score}
        stage2Score={state.stage2Score}
        stage3Score={state.stage3Score}
        stage4Score={state.stage4Score}
        selectedPainPoints={state.selectedPainPoints}
        businessImpact={state.businessImpact}
        selectedTools={state.selectedTools}
        toolReason={state.toolReason}
        selectedData={state.selectedData}
        dataDetails={state.dataDetails}
        currentHours={state.currentHours}
        targetHours={state.targetHours}
        costPerHour={state.costPerHour}
        investmentCost={state.investmentCost}
        intangibleBenefit={state.intangibleBenefit}
        pitchSummary={state.pitchSummary}
        onReset={resetGame}
      />
    ),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {pages[state.page]}
    </div>
  );
}
