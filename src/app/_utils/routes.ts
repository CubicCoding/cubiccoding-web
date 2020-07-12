export abstract class CCRoutes {

    //Auth
    static readonly SIGN_IN = 'sign-in';
    static readonly SIGN_UP = 'sign-up';
    static readonly VOUCHER = 'voucher';
    static readonly CONTACT = 'contact';

    //Dashboard
    static readonly STUDENT_PROFILE = 'student-profile';
    static readonly SCOREBOARD = 'scoreboard';
    static readonly SCORE_HISTORY = 'scoreboard/history/:email';
    static readonly TIMELINE = 'timeline';
    static readonly HELP = 'help';

}