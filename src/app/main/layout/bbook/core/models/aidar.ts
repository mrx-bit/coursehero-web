import {SortingObjectsWidget} from './sortingObjectsWidget';
import {TestWidget} from './testWidget';
import {Match} from './games/match';
import {Buyn} from './games/buyn';
import {Pazzle} from './games/pazzle';
import {PutLetters} from './games/putLetters';
import {BoxSorting} from './games/boxSorting';
import {BallWord} from './games/ball-word';
import {SyllableLine} from './games/syllable-line';
import {CreateWord} from './games/createWord';
import {Find} from './games/find';
import {WrongWord} from './games/wrongWord';
import {OddImages} from './games/oddImages';
import {FindImage} from './games/findImage';
import {Training} from './games/training';
import {OddImageText} from './games/oddImageText';
import {VideoAidar} from './games/VideoAidar';
import {number} from 'ng2-validation/dist/number';
import {PazzleBuynKizilKok} from './games/pazzleBuynKizilKok';
import {SaikestendirPhoto} from './games/saikestendirPhoto';
import {SozKura} from './games/soz-kura';

export class Aidar {
    id: string;
    name: string;
    names: object;
    description: string;
    descriptions: any;
    task: string;
    taskAudioId: string;
    contentId: string;
    imageId: string;
    backgroundImageId: string;
    bookId: string;
    buyn: Buyn[] = [];
    match: Match[] = [];
    pazzle: Pazzle = new Pazzle();
    pazzleBuyn: PazzleBuynKizilKok = new PazzleBuynKizilKok();
    saikestendirPhoto: SaikestendirPhoto = new SaikestendirPhoto();
    sozKura: SozKura = new SozKura()
    putLetters: PutLetters = new PutLetters();
    boxSorting: BoxSorting[] = [];
    find: Find = new Find();

    oddImages: OddImages[] = [];
    oddImagesText: OddImageText = new OddImageText();
    wrongWord: WrongWord = new WrongWord();
    createWord: CreateWord = new CreateWord();

    aidarType: string;
    videoAidar: VideoAidar = new VideoAidar();
    type: string;
    training: Training = new Training();
    testWidget: TestWidget = new TestWidget();

    ballWord: BallWord = new BallWord();
    syllableLine: SyllableLine[] = [];
    flowersWords: any[] = [];
    syllableConstructors: any[] = [];
    sortingObjectsWidget: SortingObjectsWidget = new SortingObjectsWidget();
    order: number;
    state = 1;

    constructor() {
    }
}
