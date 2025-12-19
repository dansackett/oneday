"use client";

import "@/styles/daily-entry-form.css";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { formatInTimeZone } from "date-fns-tz";
import {
  CSSTransition,
  SwitchTransition,
} from 'react-transition-group';

import { DailyEntry } from "@/types";
import { updateDailyEntry, markEntryCompleted } from "@/lib/daily-entries";

import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";

import EntryField from "./entry-field";


const SAVE_STATE_SAVING = "Saving...";
const SAVE_STATE_SAVED = "Saved.";
const SAVE_STATE_ERROR = "Having trouble saving. We’ll keep trying.";


interface DailyEntryFormProps {
  className?: string;
  entry: DailyEntry | null;
}

export default function DailyEntryForm({ className, entry }: DailyEntryFormProps) {
  const [saveState, setSaveState] = useState<string | null>(null);
  const [currentFieldIdx, setCurrentFieldIdx] = useState(0);
  const [fieldValues, setFieldValues] = useState({
    heavy: entry?.heavy || "",
    good: entry?.good || "",
    nextStep: entry?.nextStep || "",
  });

  const fields = [
    {
      id: 0,
      name: "heavy",
      label: "What is weighing on you?",
      value: fieldValues.heavy,
      placeholder: "You don’t have to fix it here.",
    },
    {
      id: 1,
      name: "good",
      label: "What went well?",
      value: fieldValues.good,
      placeholder: "It can be something small.",
    },
    {
      id: 2,
      name: "nextStep",
      label: "What is your next small step?",
      value: fieldValues.nextStep,
      placeholder: "Something kind to yourself counts.",
    },
  ];

  const router = useRouter();

  const hasPreviousField = currentFieldIdx > 0;

  const nodeRef = useRef(null);
  const field = fields[currentFieldIdx];

  const date = new Date();
  const today = formatInTimeZone(
    date,
    entry?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    'EEEE, LLLL do yyyy'
  );

  const handleExitClick = async () => {
    if (entry?.completed) {
      router.push("/me");
    } else {
      await markEntryCompleted(entry?.id);
    }
  };

  const handleNextClick = async () => {
    if (currentFieldIdx < fields.length - 1) {
      setCurrentFieldIdx(currentFieldIdx + 1);
    } else {
      if (entry?.completed) {
        router.push("/me");
      } else {
        await markEntryCompleted(entry?.id);
      }
    }
  };

  const handlePreviousClick = () => {
    if (hasPreviousField) {
      setCurrentFieldIdx(currentFieldIdx - 1);
    }
  };

  const onNext = useCallback(() => {
    handleNextClick();
  }, [handleNextClick]);

  const onPrevious = useCallback(() => {
    handlePreviousClick();
  }, [handlePreviousClick]);

  const onExit = useCallback(() => {
    handleExitClick();
  }, [handleExitClick]);

  const handleSaveClick = async (value: string) => {
    setSaveState(SAVE_STATE_SAVING);

    try {
      await updateDailyEntry(entry?.id, { [field.name]: value });
      setFieldValues({ ...fieldValues, [field.name]: value });
      setSaveState(SAVE_STATE_SAVED);
    } catch (error) {
      setSaveState(SAVE_STATE_ERROR);
      // retry saving
      setTimeout(() => {
        handleSaveClick(value);
      }, 2000);
    } finally {
      setTimeout(() => {
        setSaveState(null);
      }, 2000);
    }
  };

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        onNext();
      }

      if (e.key === 'Escape') {
        onExit();
      }

      if (e.shiftKey && e.key === 'Tab') {
        e.preventDefault()
        onPrevious();
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [onNext, onPrevious, onExit])

  return (
    <div className={cn("mt-2 w-full animate-fade-in", className)}>
      <div className="flex shrink-0 items-center justify-between mb-2">
        <div className={cn("text-sm font-light text-slate-800", poppins.className)}>
          { today }
        </div>
        <div className="ml-auto">
          <span className="text-sm font-light text-slate-500">{ saveState }</span>
        </div>
      </div>

      <form>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={field.id}
            timeout={500}
            classNames="fade"
            nodeRef={nodeRef}
            appear={true}
          >
            <div className="grid gap-2" ref={nodeRef}>
              <EntryField
                {...field}
                onSave={handleSaveClick}
              />
            </div>
          </CSSTransition>
        </SwitchTransition>

        <div className="flex items-center mt-10">
          <div>
            <button
              type="button"
              tabIndex={0}
              className="cursor-pointer text-slate-800 text-sm transition"
              onClick={handleExitClick}
            >
              That&apos;s enough for today
            </button>
          </div>

            <div className="ml-auto">
              <button
                type="button"
                tabIndex={0}
                disabled={!hasPreviousField}
                className={cn("mr-4 text-slate-500 hover:text-slate-950 transition disabled:opacity-30", {
                  "cursor-default pointer-events-none": !hasPreviousField,
                  "cursor-pointer pointer-events-auto": hasPreviousField,
                })}
                onClick={handlePreviousClick}
              >
                Back
              </button>

            <button
              type="button"
              tabIndex={0}
              className={cn("text-slate-800 hover:text-slate-950 cursor-pointer pointer-events-auto transition")}
              onClick={handleNextClick}
            >
              {
                field.id === fields.length - 1 ?
                  "Finish for today"
                :
                  "Continue →"
              }
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
