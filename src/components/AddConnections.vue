<template>
  <div class="connections">
    <el-card>
      <tr>
        <th>Suggested Users</th>
      </tr>
      <tr v-for="connection in connectionNames">
        <td>{{connection.userName}}</td>
        <td><el-button @click="addConnection(connection.userId)"></el-button></td>
      </tr>
    </el-card>
  </div>
</template>

<script>
    import { userRef } from "../middleware/firebase";
    import { mapGetters } from 'vuex';
    import ElButton from "element-ui/packages/button/src/button";
    import ElCard from "element-ui/packages/card/src/main";

    export default {
      components: {
        ElCard,
        ElButton},
      name: "add-connections",
      computed: {
        ...mapGetters([
          'getUserIds',
        ]),
        connections() {
          return this.users.filter((user) => this.getUserIds.indexOf(user['.key']) === -1);
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
          this.$store.commit('addConnection', uid);
        }
      },
    }
</script>

<style lang="scss" scoped>
.connections {
  width: 30%;
  margin: 5px auto;
}
</style>
