import { h, Component } from 'preact';
import style from './style';

export default class ExerciseTipsModal extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    getOutdoorExerciseTips() {
        return [
            {
                tip: "Stay hydrated and drink water.",
                imgSrc: "../../assets/drink.png",
            },
            {
                tip: "Warm up and stretch before exercising.",
                imgSrc: "../../assets/warm.png",
            },
            {
                tip: "Listen to your body's signals.",
                imgSrc: "../../assets/body.png",
            },
            {
                tip: "Cool down and stretch after workouts.",
                imgSrc: "../../assets/cool.png",
            },
            
        ];
    }

    render() {
        const { showModal } = this.state;
    
        return (
            <div class={style.exerciseTipsContainer}>
                <button class={style.toggleTipsButton} onClick={this.toggleModal}>
                    <img src="../../assets/exercise_tips.png" alt="Exercise Tips" class={style.buttonImage} />
                    <span class={style.buttonText}></span>
                </button>
                {showModal && (
                    <div class={style.modal}>
                        <div class={style.modalContent}>
                            <h3>Outdoor Exercise Tips</h3>
                            <ul>
                                {this.getOutdoorExerciseTips().map(({ tip, imgSrc }, index) => (
                                    <li
                                        class={style.tipItem}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <img
                                            src={imgSrc}
                                            alt="Tip icon"
                                            class={style.tipImage}
                                            style={{ animationDelay: `${index * 0.1 + 0.05}s` }}
                                        />
                                        <span
                                            class={style.tipText}
                                            style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
                                        >
                                            {tip}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    
    
}