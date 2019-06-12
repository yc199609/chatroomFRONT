import Vue from 'vue'
import { 
    Button,
    Card,
    Input,
    Row,
    Col,
    Container,
    Main,
    Message
} from 'element-ui'

Vue.use(Button)
Vue.use(Card)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Main)

Vue.prototype.$message = Message;