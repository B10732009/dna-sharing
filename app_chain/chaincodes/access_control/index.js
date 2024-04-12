'use strict';

const { Contract } = require('fabric-contract-api');

class AccessControlContract extends Contract {
    constructor() {
        super('AccessControlContract');
    }

    async instantiate() {
        // function that will be invoked on chaincode instantiation
    }

    async addUser(ctx, userAddress) {
        const userInfo = {
            permission: {
                chr1: 0,
                chr2: 0,
                chr3: 0,
                chr4: 0,
                chr5: 0,
                chr6: 0,
                chr7: 0,
                chr8: 0,
                chr9: 0,
                chr10: 0,
                chr11: 0,
                chr12: 0,
                chr13: 0,
                chr14: 0,
                chr15: 0,
                chr16: 0,
                chr17: 0,
                chr18: 0,
                chr19: 0,
                chr20: 0, 
                chr21: 0,
                chr22: 0,
                chr23: 0,
                chr24: 0
            }
        };
        await ctx.stub.putState(userAddress, Buffer.from(JSON.stringify(userInfo)));
        return { success: 'OK' };
    }

    async queryUser() {

    }

    async updatePermission(ctx, address, newPermission) {
        const buffer = await ctx.stub.getState(address);
        if (!buffer || !buffer.length) {
            return { error: 'NOT_FOUND' };
        }
        let userInfo = JSON.parse(buffer);
        user.permission = newPermission;
        await ctx.stub.putState(userAddress, Buffer.from(JSON.stringify(userInfo)));
        return { success: 'OK' };
    }

    async queryPermission() {

    }

    async _put(ctx, key, value) {
        await ctx.stub.putState(key, Buffer.from(value));
        return { success: 'OK' };
    }

    async _get(ctx, key) {
        const buffer = await ctx.stub.getState(key);
        if (!buffer || !buffer.length) {
            return { error: 'NOT_FOUND' };
        }
        return { success: 'OK', data: buffer.toString() };
    }

    async _query(ctx, queryString) {
        let queryIterator = await ctx.stub.getQueryResult(queryString);
        let queryResults = [];
        let iterator = await queryIterator.next();
        while (!iterator.done) {
            if (iterator.value) {
                queryResults.push({
                    key: iterator.value.key.toString('utf8'),
                    value: JSON.parse(iterator.value.value.toString('utf8'))
                });
            }
            iterator = await queryIterator.next();
        }
        queryIterator.close();
        return { success: 'OK', data: queryResults };
    }

    // async putPrivateMessage(ctx, collection) {
    //   const transient = ctx.stub.getTransient();
    //   const message = transient.get("message");
    //   await ctx.stub.putPrivateData(collection, "message", message);
    //   return { success: "OK" };
    // }

    // async getPrivateMessage(ctx, collection) {
    //   const message = await ctx.stub.getPrivateData(collection, "message");
    //   const messageString = message.toBuffer ? message.toBuffer().toString() : message.toString();
    //   return { success: messageString };
    // }

    // async verifyPrivateMessage(ctx, collection) {
    //   const transient = ctx.stub.getTransient();
    //   const message = transient.get("message");
    //   const messageString = message.toBuffer ? message.toBuffer().toString() : message.toString();
    //   const currentHash = crypto.createHash("sha256").update(messageString).digest("hex");
    //   const privateDataHash = (await ctx.stub.getPrivateDataHash(collection, "message")).toString("hex");
    //   if (privateDataHash !== currentHash) {
    //     return { error: "VERIFICATION_FAILED" };
    //   }
    //   return { success: "OK" };
    // }
}

exports.contracts = [AccessControlContract];
