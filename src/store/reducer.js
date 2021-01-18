const initialState = {
  words: 0,
  level: 100,
  mistakes: 0,
  timeRemain: 100,
  originalValue:
    "chair low studio lift policy english trip edge only climb law expand writing reveal championship tend rest fishing united star instrument expression paper mass extend other horse nice present bone conversation committee sweet winter gift parking human tank deserve text stay assessment historical negotiation face type guard advice repeat airport number feature voter justice compare transfer one trial mother factor coat flower danger increase climate generate poor setting brown invite map support initiative gold democrat supreme comparison hit free unable help daughter improvement object rural short row passenger production chance attempt full bond circle household stock planet wide block secretary sad inform arrive threaten start department perfect basis wedding taste good face video rush lake fill truth better moment prefer trade milk coach scholar direct coverage core school marriage allow symptom alive leading fear fall willing low distance record hang city eat neighborhood fish quality stretch understanding lead hire talk used line earn military kill avoid peer neck reduction winter provide sleep flight complex late match border recognize front fan factor help package focus competition schedule settle east forget access painting surgery generate income entire argue senate hole professor farmer stock die cable shoe healthy go growing organize basketball section law bottom politics male teaspoon panel presidential conclude half sell patient curriculum reason capture present weak play town big drive form stick wall gold limit second news vision manager hide private idea angry neighborhood german shut mix change dance bus age call boy wave decline become decide shop farmer range volunteer fine may loss prime high monitor rich crisis combine walk meeting combination insist abandon involved train write must realize ought ship roof include proud record element succeed market difficult human press population egg ability library meet judgment basic contract client visible meaning right soldier fear master activity pay responsibility actor dominate letter league direct necessary severe check rush huge coat manufacturer order lift enforcement weak curriculum note world new run dress prepare tradition measure fight association word hero year top job dark status politics find income impose actual procedure factory panel fair tree compare destroy sort head introduce equal example affect track liberal war strength personal daily editor one emphasis official major result industrial date call stock regional white opening ride illegal choose mark sir boss international building thick suffer passenger professional miss pair maintain soldier governor century illness afford locate leadership vary essential rise staff layer replace name elect plan hang winter factor doctor rock universe priest cause pursue resident accept failure daily note successful support vary enhance young strength action notion warn service self terrible feed spiritual independent gate necessary communication charge territory add limit demonstrate message support northern green liberal flow sense enter tax silence educational account stage labor president definition pattern grade wrap supposed sector resource light contract evaluation congressional advantage unusual challenge quote middle computer sale teacher shirt theater illness industry suit expose presence fair rise market drive talk critical newspaper test figure discipline israeli game fishing thick lunch evidence understanding maker example internal distribution teaching schedule character pick meal document attorney handle occasion admit ball involvement will radio program effective trade influence make glass late reduction surprised member pour end tension positive entry concern one attempt expect passion celebrate english different consist screen tip symbol rate wrong study circumstance jacket ancient copy conservative tear action left excellent blue interest chest senior back huge burn survey creation educational move opening producer model category diet quick definition stir eye aim measure target movie youth plate deal soft story conduct manager previous universe respect room trend identity boy display connect peer pound layer analyst stuff wine feeling path opening supreme criminal hand forget disappear army support pool move secretary leadership bit bear proper dress surprised sound small specific bedroom winter wave feature female official belong primary advice negative left visit object shut missile explore population deal similar music entry taste present resistance achievement deficit shout stand federal firm house legislation leader show explain writing strategy program start agency tip rush creation cut issue critical heat basic faculty late deliver exercise guess roll glad bend roof center involve open engineering minister balance while treatment guy return tension bag operate producer manager combination project chinese laugh commercial building",
  isFinished: false,
  wpm: 0,
  timeTick: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "COUNT_DOWN":
      return {
        ...state,
        timeRemain: state.timeRemain - 1,
        timeTick: state.timeTick + 1,
      };
    case "FINISHED":
      return {
        ...state,
        isFinished: true,
      };
    case "ON_TYPING":
      return {
        ...state,
        mistakes: action.payload.numberOfMistakes,
      };
    case "ON_TICKING":
      return {
        ...state,
        words: action.numberOfWords,
        wpm: ((action.numberOfWords / state.timeTick) * 60).toFixed(0),
      };
  }
  return state;
};

export default reducer;
