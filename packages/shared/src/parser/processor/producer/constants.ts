import { buildQuickWords, buildRegexpFromWords } from '../utils'

const RULES: string[][] = [
  // Instruments
  ['键盘', 'Keyboard', 'Kybd', 'Keys'],
  ['打击乐', 'Percussion', 'Perc'],
  ['合成器', 'Synthesizer', 'Synths', 'Synth'],
  ['采样器', 'Sampler'],
  ['序列器', 'Sequencer'],

  ['电吉他', '吉他', 'ElectricGuitar', 'AcousticGuitar', 'E.Gtr', 'A.Gtr', 'Guitar', 'Gtr'],
  ['电贝斯', '贝斯', 'ElectricBass', 'BassGuitar', 'E.Bss', 'Bass', 'Bss'],

  ['钢琴', 'Piano', 'Pno'],
  ['风琴', 'Organ', 'Org'],
  ['大键琴', 'Harpsichord', 'Hpschd'],
  ['电钢琴', 'ElectricPiano', 'Wurlitzer', 'Rhodes', 'EP'],

  ['小提琴', '提琴', 'Violin', 'Vln'],
  ['中提琴', 'Viola', 'Vla'],
  ['大提琴', 'Cello', 'Vc'],
  ['乌德琴', 'Oud'],
  ['竖琴', 'Harp', 'Hrp'],
  ['低音提琴', 'DoubleBass', 'Contrabass', 'Cb'],

  ['扬琴', 'Yangqin'],
  ['口琴', 'Harmonica'],
  ['木琴', 'Xylophone', 'Xylo'],
  ['手风琴', 'Accordion'],
  ['特雷门琴', 'Theremin'],
  ['班卓琴', 'Banjo'],
  ['西塔琴', 'Sitar'],
  ['鲁特琴', 'Lute'],
  ['颤音琴', 'Vibraphone', 'Vibes', 'Vib'],

  ['笛子', 'Dizi'],
  ['长笛', 'Flute', 'Fl'],
  ['短笛', 'Piccolo', 'Picc'],
  ['班苏里笛', 'Bansuri'],

  ['单簧管', 'Clarinet', 'Cl'],
  ['低音单簧管', 'BassClarinet', 'B.Cl'],
  ['双簧管', 'Oboe', 'Ob'],
  ['英国管', 'EnglishHorn', 'E.Hn'],

  ['小号', 'Trumpet', 'Tpt'],
  ['短号', 'Cornet', 'Cnt'],
  ['长号', 'Trombone', 'Tbn'],
  ['大号', 'Tuba', 'Tba'],
  ['圆号', 'FrenchHorn', 'Horn', 'Hn'],
  ['次中音号', 'Euphonium', 'Euph'],

  ['曼陀林', 'Mandolin'],
  ['巴松', 'Bassoon', 'Bsn'],
  ['萨克斯', 'Saxophone', 'AltoSaxophone', 'TenorSaxophone', 'BaritoneSaxophone', 'A.Sax', 'T.Sax', 'B.Sax', 'Sax'],

  ['铃鼓', 'Tambourine', 'Tamb'],
  ['康加鼓', 'Conga'],
  ['邦戈鼓', 'Bongo'],
  ['定音鼓', 'Timpani', 'Timp'],
  ['架子鼓', 'DrumSet', 'Drums', 'Dr', '鼓'],
  ['蒂姆巴尔鼓', 'Timbales'],

  ['钹', 'Cymbal'],
  ['锣', 'Gong'],
  ['箫', 'Xiao'],
  ['笙', 'Sheng'],
  ['弦', 'String'],
  ['阮', 'Ruan'],

  ['沙锤', 'Shaker'],
  ['古筝', 'Guzheng'],
  ['琵琶', 'Pipa'],
  ['二胡', 'Erhu'],
  ['巴乌', 'Bawu'],
  ['唢呐', 'Suona'],
  ['马林巴', 'Marimba'],

  // Role

  ['艺人', 'ArtistsandRepertoire'],
  ['演奏者', '乐手', '乐师', 'SessionMusician', 'SessionPlayer', 'Musician', 'Performer'],
  ['原唱', '翻唱', '配唱', '演唱', '唱'],
  ['童声', '男声', '女声', '人声', '腔', '念白'],
  ['合声', '合音'],
  ['Rap'],

  ['制作人', '制作', 'Producer', 'Prod'],
  ['执行制作人', '执制', 'ExecutiveProducer', 'ExProd'],
  ['协力制作人', '协力', '共同制作人', 'Co-Producer', 'CoProd', 'AssociateProducer'],

  ['编曲', '编', '曲', 'Arranger', 'Arrangement', 'Arr'],
  ['作曲', '作', '曲', 'Written', 'Composer', 'Comp'],
  ['作词', '作', '词', 'Lyricist', 'Lyr'],
  ['乐谱', '谱', 'Music'],
  ['编调', '编程', 'Programming', 'Programmer', 'Prog'],
  ['配器', 'Orchestrator', 'Orchestration', 'Orch'],
  ['乐器', 'MusicalInstruments'],
  ['编辑', 'AudioEditor', 'Edit', 'Editor'],
  ['监制', '监', 'Supervisor'],

  ['和声编写', '和声', '和音编写', '和音', 'BackingVocalsArranger', 'BVArranger', 'BGVsArranger', 'Bvox'],
  ['人声编辑', 'VocalEditor', 'VocalEdit'],
  ['音效设计', '音效', 'SoundEffectsDesigner', 'SFXDesigner'],

  ['指挥', 'Conductor', 'Cond'],
  ['音乐总监', 'MusicDirector', 'MD'],
  ['舞台监督', 'StageManager'],
  ['现场乐队', '乐队', 'LiveBand', 'Band'],

  ['工程师', '工程', 'Engineer', 'Eng'],
  ['音响工程师', '音响', '声工', 'AudioEngineer', 'SoundEngineer'],
  ['声音设计师', '声音', '声设', 'SoundDesigner', 'SoundDes'],
  ['母带工程师', '母带', 'MasteringEngineer', 'MasterEngineer', 'Mst'],
  ['助理工程师', '助工', '助理', 'AssistantEngineer', 'AsstEng', 'A\\.Eng'],
  ['跟踪工程师', 'TrackingEngineer', 'TrackingEng'],
  ['监听工程师', '监听', 'MonitorEngineer'],
  ['电脑工程师', '电脑', 'ComputerEngineer'],

  ['录音室经理', '录音室', 'StudioManager'],
  ['录音师', '录音', 'RecordingEngineer', 'Recordist', 'Rec'],

  ['重混音师', 'Remixer', 'Remixedby', 'Remix'],
  ['混音', '分轨', '贴混', '混', 'MixingEngineer', 'Mixer', 'Mix'],

  ['修音师', '修音'],
  ['拟音师', '拟音', 'FoleyArtist'],
  ['抄谱员', '抄谱', 'Copyist'],
  ['扒谱员', '扒谱', 'Transcriber', 'Trans'],
  ['节拍制作人', '节拍', 'Beatmaker', 'BeatMaker'],
  ['乐谱管理员', 'Librarian'],
  ['吉他技师', 'GuitarTech'],

  ['鼓技师', 'DrumTech'],
  ['灯光师', 'LightingDesigner', 'LightTech'],
  ['音控师', 'FOHEngineer', 'FrontofHouseEngineer'],
  ['调音师', '调音', '调音师', 'SoundMixer', 'LiveSoundEngineer'],

  ['后期制作', '后期', 'Post-production', 'PostProd'],
  ['母带后期', 'PostMastering'],

  ['调校', '调教'],
  ['美工', '美术', '曲绘'],
  ['视觉设计', '视觉', '设计'],
  ['题字', '文案'],
  ['封面', '海报', '图绘', '映像', '封', 'Cover', 'Image'],
  ['脚本', '分镜', '视频', 'Video', 'PV', 'MV', 'CG'],
  ['OP', 'SP'],

  ['项目统筹', '统筹', '项目', 'ProjectCoordinator', 'Coordinator'],
  ['发行', '发布', 'Release'],
  ['出品', 'Produced'],
  ['宣传', '推广', '宣发', '宣推', '营销'],
  ['版权', 'Copyright'],
  ['承办单位', '承办', '单位', '业务', '策划', '企划', '策监'],
  ['支持', '鸣谢'],
]

export const DEFAULT_PRODUCER_RULES: RegExp[] = buildRegexpFromWords(RULES)

export const DEFAULT_PRODUCER_RULES_QUICK_KEYWORDS: string[] = buildQuickWords(RULES)
