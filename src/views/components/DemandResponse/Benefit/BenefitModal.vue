<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask" @keydown.esc="close()">
            <div class="modal-container">
                <div class="modal-header ">
                    <div class="d-flex justify-content-between w-100">
                        <h5 name="header">{{buildingName}}</h5>
                        <button class="btn btn-transparent align-self-start" type="button" aria-haspopup="true"
                            aria-expanded="false" @click="close()">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body py-4">
                    <individual-benefit-distribution-table :benefits="individualBenefits"/>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script>
import IndividualBenefitDistributionTable from './IndividualBenefitDistributionTable.vue';
export default {
    components: {
        IndividualBenefitDistributionTable,
    },
    props: {
        show: Boolean,
        individualBenefits: Object,
        buildingName: String,
        title: {
            type: String,
            default: "Event Monitoring",
        },
        detail1: {
            type: String,
            default: " Loading...",
        },
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        async getEvent(){
        },
        close() {
            this.$emit('close');
        },
    },
};
</script>
<style>
.modal-mask {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-body {
    padding: 20px 30px;
    overflow-y: auto; /* Enable vertical scrolling if content overflows */
    flex-grow: 1; /* Allow the body to grow and take up space */
}

.modal-container {
    width: 80vw;
    max-height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 20px 30px;
    background-color: #f5f5f5;
    border-radius: 10px;
    /* Adjust the value to control the roundness of the corners */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h5 {
    margin-top: 0;
    color: orange;
}

.modal-default-button {
    float: right;
}

/*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

/* Custom CSS for transparent button */
.btn-transparent {
    background-color: transparent;
    border: none;
    color: #000 !important;
    box-shadow: none !important;
    padding-left: 3.25rem !important;
    padding-right: 0px !important;
    padding-top: 0px !important;
    /* Adjust the color as needed */
}

/* Style for three dots */
.three-dots {
    font-size: 1.5rem;
    /* Adjust the size as needed */
}

/* Hide the default dropdown button arrow */
.btn-transparent::after {
    content: none;
}
</style>
    
