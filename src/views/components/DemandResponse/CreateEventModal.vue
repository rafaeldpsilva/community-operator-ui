<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask" @keydown.esc="close()">
            <div class="modal-container">
                <div class="modal-header ">
                    <div class="d-flex justify-content-between w-100">
                        <h5 name="header">Create Demand Response Event</h5>
                        <button class="btn btn-transparent align-self-start" type="button" aria-haspopup="true"
                            aria-expanded="false" @click="close()">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <div class="modal-body">
                    <div>
                        <div v-if="position == 0" class="mt-4 row">
                            <div class="col-6">
                                <demand-response-opportunities-graph />
                            </div>
                            <div class="col-4">
                                <average-metric-score-graph />
                            </div>
                            <div class="col-2">
                                <button class="btn btn-sm btn-white mb-0 w-100" @click="position += 1">
                                    <i class="fa fa-caret-right" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div v-if="position == 1" class="mt-4 row">
                            <div class="col-12">
                                <ranking-table />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script>
import DemandResponseOpportunitiesGraph from "./DemandResponseOpportunitiesGraph.vue";
import AverageMetricScoreGraph from "./AverageMetricScoreGraph.vue";
import RankingTable from "./RankingTable.vue";

export default {
    name: "create-event-modal",
    props: {
        show: Boolean
    },
    components: {
        DemandResponseOpportunitiesGraph,
        AverageMetricScoreGraph,
        RankingTable
    },
    data() {
        return {
            position: 0,
        }
    },
    async mounted() {
    },
    methods: {
        clear() {
        },
        close() {
            this.$emit('close')
            this.clear()
        },
        async createDivision() {
            this.close();
        },
    },
    computed: {
        isCreateButtonDisabled: function () {
            return !this.name || !this.iots_selected || this.iots_selected.length === 0;
        },
    },
}
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

.modal-container {
    width: 850px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
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
    
