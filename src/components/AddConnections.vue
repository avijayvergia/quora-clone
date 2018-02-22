<template>
  <div class="connections" v-if="this.connections.length !== 0">
    <el-card>
      <tr>
        <h3>Add Friends: </h3>
      </tr>
      <tr v-for="connection in connectionNames" :key="connection.key">
        <td>{{connection.userName}}</td>
        <td>
          <el-button @click="addConnection(connection.userId)"></el-button>
        </td>
      </tr>
    </el-card>
  </div>
</template>

<script>
  import {userRef} from "../middleware/firebase";
  import {mapGetters} from 'vuex';
  import ElButton from "element-ui/packages/button/src/button";
  import ElCard from "element-ui/packages/card/src/main";

  export default {
    components: {
      ElCard,
      ElButton
    },
    name: "add-connections",
    computed: {
      ...mapGetters([
        'getAllIds',
        'getUserId'
      ]),
      connections() {
        return this.users.filter((user) => this.getAllIds.indexOf(user['.key']) === -1);
      },
      connectionNames() {
        const newConns = [];
        this.connections.forEach((conn) => {
          newConns.push(
            {
              'userId': conn['.key'],
              'userName': `${conn.firstName} ${conn.lastName}`,
            }
          )
        });
        return newConns;
      }
    },
    firebase: {
      users: userRef,
    },
    methods: {
      addConnection(uid) {
        userRef.child(`${this.getUserId}/friends`).update({[uid]: true}, () => this.$store.commit('addFriend', uid));
      }
    },
  }
</script>

<style lang="scss" scoped>
  .connections {
    margin: 5px auto;
  }
</style>
