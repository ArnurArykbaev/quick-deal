export type Suggestion = {
  data: SuggestionData;
  unrestricted_value: string;
  value: string;
};

type SuggestionData = {
  gender: string;
  name: string;
  patrinymic: string | null;
  surname: string | null;
  qc: number;
  source: number | null;
};
