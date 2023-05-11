import Select, { SingleValue } from "react-select";
import { useEffect, useState, useContext } from "react";
import { NuggetsContext } from "../../context/NuggetsContext";
interface OptionType {
  value: number;
  label: Number;
}

export default function () {
  const optionsXP: OptionType[] = [
    { value: 45, label: 45 },
    { value: 25, label: 25 },
    { value: 35, label: 35 },
  ];
  const optionsTimer: OptionType[] = [
    { value: 15, label: 15 },
    { value: 25, label: 25 },
    { value: 32, label: 32 },
  ];
  const { updateXPTimer } = useContext(NuggetsContext);
  const [selectedXP, setSelectedXP] = useState<OptionType>(optionsXP[0]);

  const handleChangeXP = (selectedOption: SingleValue<OptionType>) => {
    setSelectedXP(selectedOption as OptionType);
  };

  const [selectedTimer, setSelectedTimer] = useState<OptionType>(
    optionsTimer[0]
  );

  const handleChangeTimer = (selectedOption: SingleValue<OptionType>) => {
    setSelectedTimer(selectedOption as OptionType);
  };
  useEffect(() => {
    updateXPTimer({
      reward: selectedXP.value,
      timeToReward: selectedTimer.value,
    });
  }, [selectedXP.value, selectedTimer.value]);
  return (
    <>
      <div className="card-header XpTimer">
        <h2>XP & Timer</h2>
        <div className="XP-timer">
          <div className="XP">
            <p className="xp-timer-p">XP --</p>
            <Select
              className="XP-timer-bar drop-down-bar"
              value={selectedXP}
              onChange={handleChangeXP}
              options={optionsXP}
            />
            <p className="XP-timer-P">XP</p>
          </div>
          <div className="timer">
            <p className="xp-timer-p">Timer --</p>
            <Select
              className="XP-timer-bar drop-down-bar"
              value={selectedTimer}
              onChange={handleChangeTimer}
              options={optionsTimer}
            />
            <p className="XP-timer-P">Seconds</p>
          </div>
        </div>
      </div>
    </>
  );
}
