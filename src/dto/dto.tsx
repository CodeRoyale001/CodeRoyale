interface ProblemDTO {
  problemId: string;
  title: string;
  tags: string[];
  content: string;
  createdBy: string;
  difficulty: string;
}
interface SubmissionDTO {
  _id: string;
  questionId: string;
  userId: string;
  language: string;
  code: string;
  submitTime: string;
  status: string;
  lastExecutedIndex: number;
}
interface UserDetails {
  userName: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  userPhone: string;
  userCountry: string;
  userPassword: string;
  userRole: number;
  githubLink: string;
  linkedInLink: string;
  twitterLink: string;
  userInstitute: string;
  userAvatar: string;
}

interface MatchDetails {
  match_id: string;
  max_players: number;
  player_count: number;
  player_a_id: string[];
  is_available: boolean;
}
interface QuestionDetails {
  title: string;
  difficulty: string;
  content: string;
  tags: string[];
}

interface TestCase {
  input: string;
  output: string;
}
