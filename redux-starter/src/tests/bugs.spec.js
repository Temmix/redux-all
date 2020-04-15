import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureStore from "../store/configureStore";
import {
  addBug,
  loadBugs,
  resolveBug,
  bugAdded,
  unresolvedBugs
} from "../store/bugs2";

describe("bugs slice", () => {
  describe("action creators", () => {
    let fakeAxios;
    let store;
    beforeEach(() => {
      fakeAxios = new MockAdapter(axios);
      store = configureStore();
    });

    const bugSlice = () => store.getState().entities.bugs;
    const createState = () => ({
      entities: {
        bugs: {
          list: []
        }
      }
    });

    it("should add bug to the store if it is stored to the server", async () => {
      const bug = { description: "a" };
      const savedBug = { ...bug, id: 1 };
      fakeAxios.onPost("/bugs").reply(200, savedBug);

      await store.dispatch(addBug(bug));

      expect(bugSlice().list).toContainEqual(savedBug);
    });

    it("should not add bug to the store if it is not stored to the server", async () => {
      const bug = { description: "a" };
      fakeAxios.onPost("/bugs").reply(500);

      await store.dispatch(addBug(bug));

      expect(bugSlice().list).toHaveLength(0);
    });

    it("should resolved bug if it is resolved on the server", async () => {
      const bug = { id: 1, description: "a" };
      const resolvedBug = { ...bug, resolved: true };

      fakeAxios.onPatch("/bugs/1").reply(200, resolvedBug);
      fakeAxios.onPost("/bugs").reply(200, bug);
      await store.dispatch(addBug(bug));
      await store.dispatch(resolveBug(1));

      expect(bugSlice().list[0].resolved).toBe(true);
    });

    it("should not resolve the bug if it is not resolved on the server", async () => {
      const bug = { id: 1, description: "a", resolved: false };

      fakeAxios.onPatch("/bugs/1").reply(500, bug);
      fakeAxios.onPost("/bugs").reply(200, bug);
      await store.dispatch(addBug(bug));
      await store.dispatch(resolveBug(1));

      expect(bugSlice().list[0].resolved).not.toBe(true);
    });

    describe("create selectors", () => {
      it("getUnresolvedBugs", () => {
        const state = createState();
        state.entities.bugs.list = [
          { id: 1, resolved: true },
          { id: 2 },
          { id: 3 }
        ];

        const result = unresolvedBugs(state);

        expect(result).toHaveLength(2);
      });
    });

    describe("if bugs exist in the cache", () => {
      it("should not fetch from server", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());
        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if bugs does not exist in the cache", () => {
      it("should fetch from server and push into the store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        expect(bugSlice().list).toHaveLength(1);
      });

      describe("on loading for ui spinner", () => {
        it("loading property should be true when fetching is not completed", async () => {
          const bug = { description: "a" };
          const bugList = [
            { ...bug, id: 1 },
            { ...bug, id: 2 },
            { ...bug, id: 3 }
          ];
          fakeAxios.onGet("/bugs").reply(() => {
            expect(bugSlice().loading).toBe(true);
            return [200, bugList];
          });
        });

        it("loading property should be false when fetching is completed", async () => {
          const bug = { description: "a" };
          const bugList = [
            { ...bug, id: 1 },
            { ...bug, id: 2 },
            { ...bug, id: 3 }
          ];
          fakeAxios.onGet("/bugs").reply(200, bugList);

          await store.dispatch(loadBugs());
          expect(bugSlice().loading).toBe(false);
        });

        it("loading property should be false when server returns error", async () => {
          fakeAxios.onGet("/bugs").reply(500);

          await store.dispatch(loadBugs());
          expect(bugSlice().loading).toBe(false);
        });
      });
    });
  });
});
